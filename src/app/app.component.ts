import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

export enum Subjects {
  Subject = 'Subject',
  Behavior = 'BehaviorSubject',
  Replay = 'ReplaySubject',
  Async = 'AsyncSubject'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  subs: Map<
    string,
    | Subject<string>
    | BehaviorSubject<string>
    | ReplaySubject<string>
    | AsyncSubject<string>
  > = new Map();
  subNames: string[] = [
    Subjects.Subject,
    Subjects.Behavior,
    Subjects.Replay,
    Subjects.Async
  ];
  value: number = 1;
  buffer: number = 3;
  logs: string[] = [];

  ngOnInit() {
    this.subNames.forEach(sub => {
      this.subs.set(sub, this.getSubject(sub));
      this.logs.push(`new ${sub}()`);
    });
  }

  private getSubject(name: string) {
    switch (name) {
      case Subjects.Subject:
        return new Subject<string>();
      case Subjects.Behavior:
        return new BehaviorSubject<string>('0');
      case Subjects.Replay:
        return new ReplaySubject<string>(this.buffer);
      case Subjects.Async:
        return new AsyncSubject<string>();
    }
  }

  onNext() {
    this.subNames.forEach(name => {
      this.subs.get(name).next(`${this.value}`);
    });
    this.value++;
  }

  onCompleted() {
    this.subNames.forEach(name => {
      this.subs.get(name).complete();
    });
  }
}
