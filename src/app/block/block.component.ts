import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject, Subscription } from 'rxjs';
import { Subjects } from '../app.component';
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
  @Output() operation: EventEmitter<{ name: string, operation: string }> = new EventEmitter();
  currentVal: string;
  status: { isSubscribing: boolean, label: 'subscribing' | 'unsubscribed' };
  subscription: Subscription = new Subscription;
  exps = EXPS;
  replayCount: number = 0;
  total: number;

  constructor(private el: ElementRef, private render: Renderer2) { }

  ngOnInit() {
    this.total = 0;
    this.status = { isSubscribing: true, label: 'subscribing' };
    this.subscription.add(this.subscribe());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  subscribe() {
    return this.sub.subscribe(
      val => {
        this.currentVal = val;
        const ball = this.render.createElement('div');
        const text = this.render.createText(val);
        this.render.appendChild(ball, text);
        this.render.addClass(ball, 'ball');
        if (this.name === Subjects.Replay && this.replayCount >= 1 && this.replayCount < 4) {
          this.render.addClass(ball, 'horizen');
          this.replayCount++;
        }
        this.render.insertBefore(
          this.el.nativeElement.children[0],
          ball,
          this.el.nativeElement.children[0].children[0]
        );
        setTimeout(() => {
          this.total = this.total + Number(val);
          this.currentVal = `${Number(val) + 1}`;
          this.render.removeChild(this.el.nativeElement.children[0], ball);
        }, 3000);
      },
      error => {
        console.error(error);
      },
      () => {
        console.log('completed');
        this.status = { isSubscribing: false, label: 'unsubscribed' };
      }
    );
  }

  onStatusChange() {
    switch (this.status.isSubscribing) {
      case true:
        this.subscription = this.subscribe();
        this.operation.emit({ name: this.name, operation: 'subscribe' });
        break;
      case false:
        this.subscription.unsubscribe();
        if (this.name === Subjects.Replay) { this.replayCount = 1; }
        this.total = 0;
        this.operation.emit({ name: this.name, operation: 'unsubscribe' });
        break;
    }
  }
}

const EXPS = {
  'Subject': 'ノーマルなSubject。',
  'BehaviorSubject': 'subscribe開始時に直前に流れた値を流してくれる。newする時に初期値を入れる必要がある。',
  'ReplaySubject': 'newで指定した個数の値を保持する。subscribeすると保持しているデータを古い順に流してくれる。',
  'AsyncSubject': 'nextで値を流してもsubscriptionに値が流れない。completeされた時に最後に送られた値と完了通知が送られる。　　　　　　　'
};
