import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  parts: number[] = [];
  constructor() {}

  ngOnInit() {
    for (let i = 0; i < 15; i++) {
      this.parts.push(i);
    }
  }
}
