import { async, ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NotificationsComponent } from './notifications.component';
import { By } from '@angular/platform-browser';
import { NotificationService } from './notification.service';
import { AlertModule } from 'ngx-bootstrap';


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


  it('should hide when no notification', () => {
    const el = fixture.debugElement.query(By.css('#notification-box'));
    expect(el).toBeFalsy();
  });



});
