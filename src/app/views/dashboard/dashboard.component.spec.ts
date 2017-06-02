

import { DashboardComponent } from './dashboard.component';
import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { DashboardModule } from './dashboard.module';
import createSpy = jasmine.createSpy;
import { HoverflyService } from '../../shared/services/hoverfly.service';
import { NgRedux } from '@angular-redux/store';
import { createMockRedux } from '../../shared/testing/redux-helper';
import { fromJS } from 'immutable';


const mockState: Map<any, any> = fromJS(
  {
    version: 'v0.11.4',
    mode: 'simulate'
  }
);

class MockHoverflyService {
  pollHoverfly = createSpy('pollHoverfly');
  getUsage = createSpy('getUsage');
  getVersion = createSpy('getVersion');
}

describe('Component: Dashboard', () => {

  let hoverflyService: MockHoverflyService;
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DashboardModule
      ],
      providers: [
        { provide: NgRedux, useValue: createMockRedux(mockState) },
        { provide: HoverflyService, useClass: MockHoverflyService },
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    }).compileComponents();
  }));

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
  })
});
