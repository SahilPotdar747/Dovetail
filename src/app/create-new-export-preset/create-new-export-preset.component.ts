import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-new-export-preset',
  templateUrl: './create-new-export-preset.component.html',
  styleUrls: ['./create-new-export-preset.component.css'],
})
export class CreateNewExportPresetComponent implements OnInit {
  changesCancelledCallback: any;
  selectDropdown: boolean = true;
  @Input()
  isEdit: boolean = false;

  @Output()
  closeModalEmitter: EventEmitter<any> = new EventEmitter();

  selectedCar: any;
  

  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  constructor() {}

  ngOnInit(): void {}

  onSave() {
    this.closeModalEmitter.emit();
  }

  cancelModal() {
    this.closeModalEmitter.emit();
  }
}
