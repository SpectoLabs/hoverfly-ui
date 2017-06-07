import { async, ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { StatusDialogComponent } from './status-dialog.component';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { ModalModule } from 'ngx-bootstrap';
import { AuthService } from '../../shared/services/auth.service';
import { click } from '../../shared/testing/click-helper';
import { By } from '@angular/platform-browser';
import createSpy = jasmine.createSpy;
import { Observable } from 'rxjs/Observable';

class MockAuthService {
  checkAuthenticated = createSpy('checkAuthenticated').and.returnValue(Observable.of(false));
}

describe('StatusDialogComponent', () => {
  let component: StatusDialogComponent;
  let fixture: ComponentFixture<StatusDialogComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusDialogComponent, DialogboxComponent ],
      imports: [ ModalModule.forRoot() ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusDialogComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should check authentication when retry is clicked', () => {

    component.onRetry();

    expect(authService.checkAuthenticated).toHaveBeenCalled();
  });
});
