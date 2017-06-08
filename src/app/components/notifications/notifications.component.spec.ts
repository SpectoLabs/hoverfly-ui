import { async, ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NotificationsComponent } from './notifications.component';
import { NOTIFICATION_TYPE } from './notification.model';
import { By } from '@angular/platform-browser';
import { NotificationService } from './notification.service';
import { AlertModule } from 'ngx-bootstrap';

const stubInformation = {
  message: 'some information',
  type: NOTIFICATION_TYPE.INFORMATION
};

const stubError = {
  message: 'some error',
  type: NOTIFICATION_TYPE.ERROR
};


describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;
  let service: NotificationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AlertModule.forRoot()
      ],
      declarations: [ NotificationsComponent ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: NotificationService, useClass: NotificationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(NotificationService);
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should show notification message', fakeAsync(() => {
  //   service.send(stubError);
  //
  //   tick();
  //   fixture.detectChanges();
  //
  //   const el = fixture.debugElement.query(By.css('#notification-box strong'));
  //   expect(el.nativeElement.textContent).toBe('some error');
  // }));

  it('should get alert class for error message', () => {
    expect(component.getAlertClass(stubInformation)).toBe('success');
  });


  it('show get alert class for info message', () => {
    expect(component.getAlertClass(stubError)).toBe('danger');
  });

  it('show default alert class if notification type is undefined', () => {
    expect(component.getAlertClass(null)).toBe('success');
  });

  it('should hide when no notification', () => {
    const el = fixture.debugElement.query(By.css('#notification-box'));
    expect(el).toBeFalsy();
  });



});
