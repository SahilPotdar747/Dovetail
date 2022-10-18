import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-new-phase',
  templateUrl: './create-new-phase.component.html',
  styleUrls: ['./create-new-phase.component.css'],
})
export class CreateNewPhaseComponent implements OnInit {
  @Input()
  isEdit: boolean = false;

  @Output()
  closeModalEmitter: EventEmitter<any> = new EventEmitter();

  constructor() {}
  
  ngOnInit(): void {}

  onSave() {
    this.closeModalEmitter.emit();
  }

  cancelModal() {
    this.closeModalEmitter.emit();
  }
}
