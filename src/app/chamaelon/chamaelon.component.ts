import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chamaelon',
  templateUrl: './chamaelon.component.html',
  styleUrls: ['./chamaelon.component.css']
})
export class ChamaelonComponent implements OnChanges {
  @Input() length: number = 640;
  @Input() bodyColor: string = 'orange';
  viewBox = '0 0 640 640';

  constructor() {}

  ngOnChanges(sc: SimpleChanges) {
    if (sc['Input']) {
      this.viewBox = `0 0 ${length} ${length}`;
    }
  }
}
