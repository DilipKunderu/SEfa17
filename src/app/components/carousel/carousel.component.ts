import { HouseListingService } from './../../house-listing.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})

export class CarouselComponent implements OnInit {

  constructor(private http: HttpClient, private data: HouseListingService) {}

  ngOnInit() {
  }

}
