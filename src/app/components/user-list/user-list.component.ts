import { Component, OnInit } from '@angular/core';
import { HouseListingService } from '../../house-listing.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  res: object;
  array: Array<any> = [];
  differ: any;

  constructor(
    private data: HouseListingService,
    private http: HttpClient,
    private router: Router,) { 
    }

  deleted (s: string) {
    this.http.delete('http://174.64.102.57:3000/delete_id?id='+ s)
    .subscribe(res => {
      // console.log(res);
      this.router.navigate(['/']);
    });
  }

  ngOnInit() {
    this.http.get('http://174.64.102.57:3000/mylease?name=' + this.data.userName)
    .subscribe(res => {
      this.res = res;
      [].push.apply(this.array, res);
    });
  }
}
