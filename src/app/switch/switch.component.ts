import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {
  @Input() status: { isSubscribing: boolean, label: 'subscribing' | 'unsubscribed' };
  @Output() statusChange: EventEmitter<{ isSubscribing: boolean, label: 'subscribing' | 'unsubscribed' }> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChange() {
    this.status.label = this.status.isSubscribing ? 'subscribing' : 'unsubscribed';
    this.statusChange.emit(this.status);
  }

}
