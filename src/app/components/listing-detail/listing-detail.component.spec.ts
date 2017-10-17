import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MaterialModule} from '../../custom-material/custom-material.module'
import { ListingDetailComponent } from './listing-detail.component';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ListingDetailComponent', () => {
  let component: ListingDetailComponent;
  let fixture: ComponentFixture<ListingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingDetailComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
