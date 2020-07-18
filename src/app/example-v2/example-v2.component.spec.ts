import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleV2Component } from './example-v2.component';

describe('ExampleV2Component', () => {
  let component: ExampleV2Component;
  let fixture: ComponentFixture<ExampleV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
