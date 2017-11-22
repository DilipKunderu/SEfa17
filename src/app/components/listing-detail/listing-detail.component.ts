import { Component, OnInit } from '@angular/core';
import {MdListModule} from '@angular/material';
import {
  Router, ActivatedRoute
}
from '@angular/router';
import { HouseListingService } from './../../house-listing.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.css']
})


export class ListingDetailComponent implements OnInit {
  res: Object;
  
  constructor(private data: HouseListingService, private route: ActivatedRoute,  private router: Router, private http: HttpClient) {  
    var  Listing: ListingDetailComponent;
    var URL = 'http://192.168.1.243:3000/';
  
    this.route.params.subscribe(params => {  
      const id = (params['id']);
      this.http.get(URL+'get_id?id='+id)
      .subscribe(res => {
       this.res = res;
       const a = JSON.stringify(res);
       const b = JSON.parse(a);

        var title:string = b._source.title;
        var title1 = document.getElementById("title");
        title1.className = "title";
        var title2= document.createTextNode(title);
        title1.appendChild(title2);

        var desc:string = b._source.description;
        var desc1 = document.getElementById("desc");
        var desc2= document.createTextNode(desc);
        desc1.appendChild(desc2);

        var imgsrc:string = b._source.images[0];
        var img1 = document.getElementById("img");
        var u = "http://192.168.1.243:3000/uploads/" + imgsrc;
        img1.setAttribute('style',"background-image:url("+u+");background-size: 100% 100%;background-repeat: no-repeat;");
        

        var rent:string = b._source.rent;
        var rent1 = document.getElementById("rent");
        var rent2= document.createTextNode(":  $" + rent);
        rent1.className = "desc";
        rent1.appendChild(rent2);

        var nbed:string = b._source.bedrooms;
        var nbed1 = document.getElementById("nbed");
        var nbed2= document.createTextNode(":  " + nbed);
        nbed1.className = "desc";
        nbed1.appendChild(nbed2);

        var nbath:string = b._source.bathrooms;
        var nbath1 = document.getElementById("nbath");
        var nbath2= document.createTextNode(":  " + nbath);
        nbath1.className = "desc";
        nbath1.appendChild(nbath2);

        var rt:string = b._source.roomtype;
        var rt1 = document.getElementById("rt");
        var rt2= document.createTextNode(":  " + rt);
        rt1.className = "desc";
        rt1.appendChild(rt2);

        var zipcode:string = b._source.zipcode;
        var zipcode1 = document.getElementById("zipcode");
        var zipcode2= document.createTextNode(":  " + zipcode);
        zipcode1.className = "desc";
        zipcode1.appendChild(zipcode2);

        var gym:boolean = b._source.gym;
        var gym1 = document.getElementById("gym");
        var gym2= document.createTextNode("Gym");
      
        if(!gym){
            gym1.className = "strikethrough"
        }
        gym1.appendChild(gym2);

        var wandd:boolean = b._source.washer_dryer;
        var wandd1 = document.getElementById("wandd");
        var wandd2= document.createTextNode("Washer and Drier");
      
        if(!wandd){
          wandd1.className = "strikethrough"
        }
        wandd1.appendChild(wandd2);

        var ac:boolean = b._source.airconditioning;
        var ac1 = document.getElementById("ac");
        var ac2= document.createTextNode("Air Conditioner");
      
        if(!ac){
            ac1.className = "strikethrough"
        }
        ac1.appendChild(ac2);

        var internet:boolean = b._source.wireless_internet;
        var internet1 = document.getElementById("internet");
        var internet2= document.createTextNode("Internet");
      
        if(!internet){
          internet1.className = "strikethrough"
        }
        internet1.appendChild(internet2);

        var pool:boolean = b._source.pool;
        var pool1 = document.getElementById("pool");
        var pool2= document.createTextNode("Pool");
      
        if(!pool){
            pool1.className = "strikethrough"
        }
        pool1.appendChild(pool2);

        var pb:boolean = b._source.private_bathroom;
        var pb1 = document.getElementById("pb");
        var pb2= document.createTextNode("Private bathroom");
      
        if(!pb){
          pb1.className = "strikethrough"
        }
        pb1.appendChild(pb2);

        var waccess:boolean = b._source.wheelchair_accessible;
        var waccess1 = document.getElementById("waccess");
        var waccess2= document.createTextNode("Wheelchair accessible");
      
        if(!waccess){
          waccess1.className = "strikethrough"
        }
        waccess1.appendChild(waccess2);
        
        });
        });
          
     
  }
  
  ngOnInit() {
    
  }
  
  
  guests = [
    {value: '1'},
    {value: '2'},
    {value: '3'},
    {value: '4'}
  ];
 

}
