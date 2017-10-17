import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../custom-material/custom-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { SelectorComponent } from './selector.component';

describe('SelectorComponent', () => {
  let component: SelectorComponent;
  let fixture: ComponentFixture<SelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MaterialModule, MdDialogRef]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
