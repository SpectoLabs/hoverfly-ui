import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavBarComponent } from './topnavbar.component';
import { TopNavBarModule } from './topnavbar.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('Component: TopNavBar', () => {
  let component: TopNavBarComponent;
  let fixture: ComponentFixture<TopNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TopNavBarModule,
        RouterTestingModule
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
