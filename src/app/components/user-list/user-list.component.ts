import { Component, OnInit } from '@angular/core';
import { HouseListingService } from '../../house-listing.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  res: object;
  array: Array<any> = [];

  constructor(
    private data: HouseListingService,
    private http: HttpClient) { }

  deleted (s: string) {
    console.log(s);
  }

  ngOnInit() {
    this.http.get('http://192.168.2.24:3000/mylease?name=Saptarshi')
    .subscribe(res => {
      this.res = res;
      console.log(res);
      [].push.apply(this.array, res);
    });
  }

}
