import { Component, OnInit } from '@angular/core';
import {MdListModule} from '@angular/material'

@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.css']
})
@Component({
  selector: 'app-listing-detail',
  template: `
      <div [class.collapsed]="isCollapsed">
          <ng-content></ng-content>
          <div (click)="isCollapsed =! isCollapsed">Read more</div>
      </div>
  `,
  styles: [`
      div.collapsed {
          height: 250px;
      }
  `]
})

export class ListingDetailComponent implements OnInit {
  
  constructor() {  }

  ngOnInit() {
  }
  
  
  guests = [
    {value: '1'},
    {value: '2'},
    {value: '3'},
    {value: '4'}
  ];
  heading1 = "The space"
  text = "Near Heian Shrine. Perfect for friends, couples. Walking distance to many historical sites. Bus subway supermarket ok. Great cultural area with museums, theaters, Martial arts center, a relaxing coffeeshop with table outside in the Heian Shrine park area.";
  text2 = "It is a Japanese style room, simple and clean. It s provided with the basics for your stay. Free Wi-Fi. Bluetooth. Security lock entrance. Very close to bus stop, supermarket, cafes, restaurants, and many famous spots."
  
 heading2 = "Guest access"
  
text3 = "It is a private one room apartment."
  
  heading3 = "Interaction with guests"
  
  text4 = "I communicate with guests through mail at first, then other applications as the guests wish. The guests can feel free to contact me for anything before and during their stay."
  isCollapsed: boolean = true;

  
  bookHouse(form: any){
    alert(form.toString());
    if(form.noOfGuests == ''){
      form.noOfGuests='1';
    }
    alert(form.checkInDate); 
    alert(form.checkOutDate);
    alert(form.noOfGuests); 
  }
  

}

