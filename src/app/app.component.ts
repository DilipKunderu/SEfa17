import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { HouseListingService } from './house-listing.service';

import 'rxjs/add/operator/filter';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private http: HttpClient,
    private data: HouseListingService
   ) {
      iconRegistry.addSvgIcon( 'logo',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/logo.svg'));

  }

  ngOnInit() {
  }


}
