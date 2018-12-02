import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamaelonComponent } from './chamaelon.component';

describe('ChamaelonComponent', () => {
  let component: ChamaelonComponent;
  let fixture: ComponentFixture<ChamaelonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChamaelonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamaelonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
