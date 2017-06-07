import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from "ngx-bootstrap";

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent implements OnInit {

  @ViewChild('childModal') public childModal: ModalDirective;

  @Input() dialogTitle: string;
  @Output() onHidden: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  onChildHidden() {
    this.onHidden.emit(null);
  }
}
