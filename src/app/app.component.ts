import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

import 'rxjs/add/operator/filter';

import { HttpClient } from '@angular/common/http';


// import { MapModifierService } from './services/mapmodifier/map-modifier.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  testData: Array<any> = [];
  testObj: Object;


  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private http: HttpClient
   ) {
    // private latServ: MapModifierService) {
    // To avoid XSS attacks, the URL needs to be trusted from inside of your application.
      iconRegistry.addSvgIcon( 'logo',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/logo.svg'));
      this.http.get('https://jsonplaceholder.typicode.com/posts/1')
      .subscribe(res => {
        this.testObj = res;
        [].push.apply(this.testData, res);
        console.log(res);
      });

      // console.log(this.testData);

  }

  ngOnInit() {
  }

}
