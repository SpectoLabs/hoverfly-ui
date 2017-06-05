

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


const mockState: Map<any, any> = fromJS(
  {
    version: 'v0.11.4',
    mode: 'simulate'
  }
);

class MockHoverflyService {
  pollHoverfly = createSpy('pollHoverfly').and.returnValue(new Subscription());
  getUsage = createSpy('getUsage');
  getVersion = createSpy('getVersion');
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

  // it('should show hoverfly configuration', () => {
  //   console.log('hoverfly' + component.hoverfly.mode);
  //
  //   const mode = fixture.debugElement.query(By.css('#hoverfly-info-mode span'));
  //   expect(mode.nativeElement.textContent).toBe('simulate');
  // });


  // it('should show middleware details if middleware is set', async(() => {
  //
  //   TestBed.resetTestingModule();
  //   const stateWithMiddleware: Map<any, any> = fromJS(
  //     {
  //       version: 'v0.11.4',
  //       mode: 'simulate',
  //       middleware: {
  //         binary: 'java',
  //         script: 'empty placeholder file'
  //       }
  //     }
  //   );
  //
  //   configureTestModule(stateWithMiddleware).then(() => {
  //     fixture = TestBed.createComponent(DashboardComponent);
  //     // const binaryField = fixture.debugElement.query(By.css('#hoverfly-middleware-details-binary'));
  //     // const remoteField = fixture.debugElement.query(By.css('#hoverfly-middleware-details-remote'));
  //     // const scriptBlock = fixture.debugElement.query(By.css('#hoverfly-middleware-details-script'));
  //
  //     const defaultBody = fixture.debugElement.query(By.css('#hoverfly-middleware-default-body'));
  //     //
  //     expect(defaultBody).toBeFalsy();
  //     //
  //     // expect(defaultBody.nativeElement.textContent).toBe('No middleware is set.');
  //   });
  //
  // }));

  it('should hide middleware details if middleware is not set', () => {
    const middlewareTable = fixture.debugElement.query(By.css('#hoverfly-middleware-details'));
    const defaultBody = fixture.debugElement.query(By.css('#hoverfly-middleware-default-body'));

    expect(middlewareTable).toBeFalsy();

    expect(defaultBody.nativeElement.textContent).toBe('No middleware is set.');
  });

});
