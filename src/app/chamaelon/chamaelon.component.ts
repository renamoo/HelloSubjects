import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chamaelon',
  templateUrl: './chamaelon.component.html',
  styleUrls: ['./chamaelon.component.scss']
})
export class ChamaelonComponent implements OnChanges {
  @Input() status: { isSubscribing: boolean, label: 'subscribing' | 'unsubscribed' };
  @Input() exp: string;
  @Input() total: number;
  constructor() { }

  ngOnChanges(sc: SimpleChanges) {
  }
}
