/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListAkitaComponent } from './list-akita.component';

describe('ListAkitaComponent', () => {
  let component: ListAkitaComponent;
  let fixture: ComponentFixture<ListAkitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAkitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAkitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
