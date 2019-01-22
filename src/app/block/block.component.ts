import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject, Subscription } from 'rxjs';
@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit, OnDestroy {
  @Input() sub:
    | Subject<string>
    | BehaviorSubject<string>
    | ReplaySubject<string>
    | AsyncSubject<string>;
  @Input() name: string;
  currentVal: string;
  status: { isSubscribing: boolean, label: 'subscribing' | 'unsubscribed' };
  subs: Subscription[] = [];

  constructor(private el: ElementRef, private render: Renderer2) { }

  ngOnInit() {
    this.subscribe();
    this.status = { isSubscribing: true, label: 'subscribing' };
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  subscribe() {
    this.subs.push(this.sub.subscribe(
      val => {
        this.currentVal = val;
        const ball = this.render.createElement('div');
        const text = this.render.createText(val);
        this.render.appendChild(ball, text);
        this.render.addClass(ball, 'ball');
        this.render.insertBefore(
          this.el.nativeElement.children[0],
          ball,
          this.el.nativeElement.children[0].children[0]
        );
        setTimeout(() => {
          this.currentVal = `${Number(val) + 1}`;
          this.render.removeChild(this.el.nativeElement.children[0], ball);
        }, 3000);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('completed');
        this.status = { isSubscribing: false, label: 'unsubscribed' };
      }
    ));
  }

  onStatusChange() {
    switch (this.status.isSubscribing) {
      case true:
        this.subscribe();
        break;
      case false:
        this.sub.unsubscribe();
        break;
    }
  }
}
