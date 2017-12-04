import { Component, OnInit, Input, IterableDiffers, DoCheck } from '@angular/core';
import { HouseListingService } from '../../house-listing.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, DoCheck {
  res: object;
  @Input() array: Array<any> = [];
  differ: any;

  constructor(
    private data: HouseListingService,
    private http: HttpClient,
    private router: Router,
    private differs: IterableDiffers) { 
      this.differ = differs.find([]).create(null);
    }

  deleted (s: string) {
    this.http.delete('http://192.168.2.24:3000/delete_id?id='+ s)
    .subscribe(res => {
      // console.log(res);
      // this.router.navigate(['/']);
    })
  }

  ngOnInit() {
    this.getLatest();
  }

  ngDoCheck() {
    const change = this.differ.diff(this.array);
    this.array.length = 0;
    this.getLatest();
  }

  getLatest() {
    this.http.get('http://192.168.2.24:3000/mylease?name=' + this.data.userName)
    .subscribe(res => {
      this.res = res;
      [].push.apply(this.array, res);
    });
  }
}
