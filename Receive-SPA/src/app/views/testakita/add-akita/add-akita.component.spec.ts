/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddAkitaComponent } from './add-akita.component';

describe('AddAkitaComponent', () => {
  let component: AddAkitaComponent;
  let fixture: ComponentFixture<AddAkitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAkitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAkitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
