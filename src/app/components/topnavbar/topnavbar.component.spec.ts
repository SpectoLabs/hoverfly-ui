/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TopnavbarComponent } from './topnavbar.component';
import { TopnavbarModule } from "./topnavbar.module";
import { RouterTestingModule } from "@angular/router/testing";

describe('TopnavbarComponent', () => {
  let component: TopnavbarComponent;
  let fixture: ComponentFixture<TopnavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TopnavbarModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
