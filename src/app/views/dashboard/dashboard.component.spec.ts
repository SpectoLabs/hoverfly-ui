

import { DashboardComponent } from './dashboard.component';
import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { DashboardModule } from './dashboard.module';
import createSpy = jasmine.createSpy;
import { HoverflyService } from '../../shared/services/hoverfly.service';
import { NgRedux } from '@angular-redux/store';
import { createMockRedux } from '../../shared/testing/redux-helper';
import { fromJS } from 'immutable';
import { Subscription } from 'rxjs/Subscription';
import { By } from '@angular/platform-browser';
import { MockNgRedux } from '@angular-redux/store/lib/testing';
import { click } from '../../shared/testing/click-helper';


const mockState: Map<any, any> = fromJS(
  {
    version: 'v0.11.4',
    mode: 'simulate',
    destination: 'hoverfly.io'
  }
);

class MockHoverflyService {
  pollHoverfly = createSpy('pollHoverfly').and.returnValue(new Subscription());
  getVersion = createSpy('getVersion');
  setMode = createSpy('setMode')
}

describe('Component: Dashboard', () => {

  let hoverflyService: MockHoverflyService;
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const configureTestModule = function (state: Map<any, any>) {
    return TestBed.configureTestingModule({
      imports: [
        DashboardModule
      ],
      providers: [
        { provide: NgRedux, useValue: createMockRedux(state) },
        { provide: HoverflyService, useClass: MockHoverflyService },
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    })
      .compileComponents();
  };

  beforeEach(async(() => configureTestModule(mockState)));

  beforeEach(() => {
    MockNgRedux.reset();  // This seem to be required to use our mock state
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    hoverflyService = TestBed.get(HoverflyService);
  });

  it('should create the dashboard', () => {
    expect(component).toBeTruthy();
  });


  it('should start polling hoverfly on init', () => {
    expect(hoverflyService.pollHoverfly).toHaveBeenCalled();
  });

  it('should show hoverfly configuration', () => {

    const mode = fixture.debugElement.query(By.css('#hoverfly-info-mode span'));
    const destination = fixture.debugElement.query(By.css('#hoverfly-info-dest code'));
    const version = fixture.debugElement.query(By.css('#hoverfly-info-ver'));

    expect(mode.nativeElement.textContent).toBe('simulate');
    expect(destination.nativeElement.textContent).toBe('hoverfly.io');
    expect(version.nativeElement.textContent).toBe('v0.11.4');
  });


  it('should show middleware details if middleware is set', async(() => {

    TestBed.resetTestingModule();
    const stateWithMiddleware: Map<any, any> = fromJS({
        middleware: {
          binary: 'java',
          script: 'empty placeholder file'
        }
    });

    configureTestModule(stateWithMiddleware).then(() => {
      MockNgRedux.reset();
      fixture = TestBed.createComponent(DashboardComponent);

      const binaryField = fixture.debugElement.query(By.css('#hoverfly-middleware-details-binary code'));
      const remoteField = fixture.debugElement.query(By.css('#hoverfly-middleware-details-remote code'));
      const scriptBlock = fixture.debugElement.query(By.css('#hoverfly-middleware-details-script code'));
      const defaultBody = fixture.debugElement.query(By.css('#hoverfly-middleware-default-body'));

      expect(defaultBody).toBeFalsy();
      expect(binaryField.nativeElement.textContent).toBe('java');
      expect(remoteField.nativeElement.textContent).toBe('');
      expect(scriptBlock.nativeElement.textContent).toBe('empty placeholder file');
    });

  }));


  it('should hide middleware details if middleware is not set', () => {
    const middlewareTable = fixture.debugElement.query(By.css('#hoverfly-middleware-details'));
    const defaultBody = fixture.debugElement.query(By.css('#hoverfly-middleware-default-body'));

    expect(middlewareTable).toBeFalsy();

    expect(defaultBody.nativeElement.textContent).toBe('No middleware is set.');
  });

  it('should initialize usage counters to zeros', () => {
    const counters = fixture.debugElement.query(By.css('#hoverfly-counters'));

    counters.children.forEach(c => expect(c.nativeElement.textContent).toBe('0'));
  });

  it('should show usage counters', async(() => {

    TestBed.resetTestingModule();
    const stateWithMiddleware: Map<any, any> = fromJS({
        usage: {
          counters: {
            capture: 100,
            simulate: 200,
            modify: 300,
            synthesize: 400
          }
        }
    });

    configureTestModule(stateWithMiddleware).then(() => {
      MockNgRedux.reset();
      fixture = TestBed.createComponent(DashboardComponent);

      const counters = fixture.debugElement.query(By.css('#hoverfly-counters'));

      expect(counters.children[0].nativeElement.textContent).toBe('100');
      expect(counters.children[1].nativeElement.textContent).toBe('200');
      expect(counters.children[2].nativeElement.textContent).toBe('300');
      expect(counters.children[3].nativeElement.textContent).toBe('400');
    });
  }));

  it('should set mode when click on mode selector', () => {
    const captureLink = fixture.debugElement.query(By.css('#hoverfly-mode-selector:first-child a')).nativeElement;
    click(captureLink);

    expect(hoverflyService.setMode).toHaveBeenCalledWith('capture');
  });

  it('should highlight current mode selector button', () => {
    const captureLink = fixture.debugElement.query(By.css('#hoverfly-mode-selector:first-child a'));
    const simulateLink = fixture.debugElement.query(By.css('#hoverfly-mode-selector [name=simulate]'));

    expect(captureLink.nativeElement.className).toContain('btn-default');
    expect(simulateLink.nativeElement.className).toContain('btn-primary');
  })

});
