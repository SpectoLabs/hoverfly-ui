import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogboxComponent } from './dialogbox.component';
import { ModalModule } from 'ngx-bootstrap';

describe('DialogboxComponent', () => {
  let component: DialogboxComponent;

  let fixture: ComponentFixture<DialogboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ModalModule.forRoot() ],
      declarations: [ DialogboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show modal', () => {
    spyOn(component.childModal, 'show');
    component.showChildModal();

    expect(component.childModal.show).toHaveBeenCalled();
  });

  it('should hide modal', () => {
    spyOn(component.childModal, 'hide');

    component.hideChildModal();
    expect(component.childModal.hide).toHaveBeenCalled();
  });

});
