/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserChangeComponent } from './user-change.component';

describe('UserChangeComponent', () => {
  let component: UserChangeComponent;
  let fixture: ComponentFixture<UserChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
