import { AgmCoreModule } from '@agm/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../../custom-material/custom-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        MaterialModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyDSFMoD5C6VpWI6D7uZd-OfvuZBUc8cdj8',
          libraries: ['places']
        })
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
