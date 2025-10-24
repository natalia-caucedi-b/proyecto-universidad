/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AmigurumisComponent } from './amigurumis.component';

describe('AmigurumisComponent', () => {
  let component: AmigurumisComponent;
  let fixture: ComponentFixture<AmigurumisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmigurumisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmigurumisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
