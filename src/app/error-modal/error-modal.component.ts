import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css'],
})
export class ErrorModalComponent implements OnInit {
  constructor() {}
  @Input()
  error: any;

  @Output()
  closeEmmitter: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {}

  hideErrorModal() {
    this.closeEmmitter.emit();
  }
}
