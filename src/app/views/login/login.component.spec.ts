import { NgRedux } from "@angular-redux/store";
import { LoginComponent } from "./login.component";
import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { click } from "../../shared/testing/click-helper";
import { RouterTestingModule } from "@angular/router/testing";
import { HOVERFLY_CLOUD_REL } from "../../shared/hateoas/hateoas.rel";
import { createMockRedux, MOCK_HATEOAS_LINKS } from "../../shared/testing/redux-helper";

describe('Component: Login', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: NgRedux, useValue: createMockRedux(MOCK_HATEOAS_LINKS) },
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get login url from hateoas store', () => {
    expect(component.loginUrl).toBe(MOCK_HATEOAS_LINKS.get(HOVERFLY_CLOUD_REL.GITHUB_LOGIN))
  });

  it('should redirect to github login when clicked', () => {
    spyOn(component, 'signInGitHub');
    const loginEl = fixture.debugElement.query(By.css('#login-github-link a'));

    click(loginEl);

    expect(component.signInGitHub).toHaveBeenCalled();
  });


});