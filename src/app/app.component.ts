import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

export type SubjectTypes = 'Subject' | 'BehaviorSubject' | 'ReplaySubject' | 'AsyncSubject';
export namespace Subjects {
  export const Sub = 'Subject';
  export const Behavior = 'BehaviorSubject';
  export const Replay = 'ReplaySubject';
  export const Async = 'AsyncSubject';
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
    Subjects.Sub,
    Subjects.Behavior,
    Subjects.Replay,
    Subjects.Async
  ];
  value: number = 1;
  buffer: number = 3;
  logs: Map<string, string[]> = new Map();
  selected: SubjectTypes = Subjects.Sub;

  ngOnInit() {
    this.subNames.forEach(sub => {
      this.subs.set(sub, this.getSubject(sub));
      this.logs.set(sub, [NEW_LOG(sub, sub === Subjects.Replay ? `${this.buffer}` : sub === Subjects.Behavior ? '0' : '')]);
      this.logs.get(sub).unshift(SUB_LOG);
    });
  }

  private getSubject(name: string) {
    switch (name) {
      case Subjects.Sub:
        return new Subject<string>();
      case Subjects.Behavior:
        return new BehaviorSubject<string>('0');
      case Subjects.Replay:
        return new ReplaySubject<string>(3);
      case Subjects.Async:
        return new AsyncSubject<string>();
    }
  }

  onNext() {
    this.subNames.forEach(name => {
      const sub = this.subs.get(name);
      sub.observers ? this.subs.get(name).next(`${this.value}`) : console.log('No subject found!');
      this.logs.get(name).unshift(`sub.next(${this.value});`);
    });
    this.value++;
  }

  onCompleted() {
    this.subNames.forEach(name => {
      this.subs.get(name).complete();
      this.logs.get(name).unshift(`sub.complete();`);
    });
  }

  onSelect(name: SubjectTypes) {
    this.selected = name;
  }

  onOperation(event: { name: string, operation: string }) {
    let log: string;
    switch (event.operation) {
      case 'subscribe': log = SUB_LOG; break;
      case 'unsubscribe': log = UNSUB_LOG; break;
    }
    this.logs.get(event.name).unshift(log);
  }

  onReload() {
    location.reload();
  }

  onDoorClick() {
    window.open('https://github.com/renamoo/HelloSubjects/issues', '_blank');
  }
}

const SUB_LOG = `const subscription
= this.s$.subscribe();
`;
const UNSUB_LOG = `subscription
.unsubscribe();
`;
const NEW_LOG = (sub: string, buffer?: string) => `const s$ =
new ${sub}(${buffer});
`;

