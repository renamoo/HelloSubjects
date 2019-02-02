import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  @Input() logs: string[];

  constructor() { }

  ngOnInit() {
  }

}
