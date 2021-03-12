/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditAkitaComponent } from './edit-akita.component';

describe('EditAkitaComponent', () => {
  let component: EditAkitaComponent;
  let fixture: ComponentFixture<EditAkitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAkitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAkitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
