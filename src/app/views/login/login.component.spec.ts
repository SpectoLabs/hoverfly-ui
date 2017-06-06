

import { LoginComponent } from './login.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginModule } from './login.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../shared/services/auth.service';
import createSpy = jasmine.createSpy;

class MockAuthService {
  login = createSpy('login');
}

describe('Component: Login', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LoginModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create the login', () => {
    expect(component).toBeTruthy();
  });

});
