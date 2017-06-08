import { async, ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { StatusDialogComponent } from './status-dialog.component';
import createSpy = jasmine.createSpy;
import { StatusDialogService } from './status-dialog.service';
import { StatusDialogModule } from './status-dialog.module';

class MockStatusDialogService {
  retry = createSpy('retry');
}

describe('StatusDialogComponent', () => {
  let component: StatusDialogComponent;
  let fixture: ComponentFixture<StatusDialogComponent>;
  let service: StatusDialogService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StatusDialogModule
      ],
      providers: [
        { provide: StatusDialogService, useClass: MockStatusDialogService },
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusDialogComponent);
    component = fixture.componentInstance;
    service = TestBed.get(StatusDialogService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should check authentication when retry is clicked', () => {

    component.onRetry();

    expect(service.retry).toHaveBeenCalled();
  });
});
