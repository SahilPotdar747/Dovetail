import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {
  @Output()
  isEdit: boolean = false;
  modalRef: any;
  selectedCar: any;
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];
  constructor(private modalService: BsModalService) { }

  @Output()
  closeModalEmitter: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
  }
  onSave() {
    this.closeModalEmitter.emit();
  }
  cancelModal() {
    this.closeModalEmitter.emit();
  }

}
