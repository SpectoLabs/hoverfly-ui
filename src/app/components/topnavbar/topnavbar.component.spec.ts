import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavBarComponent } from './topnavbar.component';
import { TopNavBarModule } from './topnavbar.module';
import { RouterTestingModule } from '@angular/router/testing';
import createSpy = jasmine.createSpy;
import { AuthService } from '../../shared/services/auth.service';
import { MockAuthService } from '../../shared/testing/mock-helper.spec';

describe('Component: TopNavBar', () => {
  let component: TopNavBarComponent;
  let fixture: ComponentFixture<TopNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TopNavBarModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
