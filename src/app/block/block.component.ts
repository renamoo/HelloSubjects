import { Component, Input, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  @Input() sub:
    | Subject<string>
    | BehaviorSubject<string>
    | ReplaySubject<string>
    | AsyncSubject<string>;
  @Input() name: string;
  isReceived: boolean = false;
  currentVal: string;

  constructor() {}

  ngOnInit() {
    this.subscribe();
  }

  subscribe() {
    this.sub.subscribe(val => {
      this.currentVal = val;
      this.isReceived = true;
      setTimeout(() => {
        this.isReceived = false;
        this.currentVal = `${Number(val) + 1}`;
      }, 3000);
    });
  }
}
