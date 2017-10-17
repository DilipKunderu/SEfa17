// import { SelectorComponent } from './components/selector/selector.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from './custom-material/custom-material.module';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    // setTimeout(function () {
    //     console.log('inside timeout');
    //     done();
    // }, 500);
    TestBed.configureTestingModule({
      declarations: [
      AppComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [
        RouterTestingModule,
        MaterialModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule
      ],
    }).compileComponents()
    .then(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const comp = fixture.componentInstance;
    });
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
