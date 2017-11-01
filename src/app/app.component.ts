import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: string;
  titles: Array<string> = [
    'Under Construction',
    'Under Construction.',
    'Under Construction..',
    'Under Construction...'];

  titleCounter: number = 0;
  urlCounter: number = 0;
  myData: Array<any> = [];
  res: Object;
  imgUrl: string = 'https://source.unsplash.com/random/800x600';

    constructor(private http: HttpClient) {
      this.title = this.titles[0];
      setInterval((): void => {
        this.title = this.titles[this.titleCounter];
        this.titleCounter++;
        this.titleCounter %= 4;
      }, 500);

      this.http.get('http://174.64.102.57:3000/leasemetadata')
      .subscribe(res => {
        this.res = res;
        [].push.apply(this.myData, res);
      });

      setInterval((): void => {
        this.imgUrl = 'http://174.64.102.57:3000/uploads/' + this.extractURL(this.myData[this.urlCounter]);
        this.urlCounter++;
        this.urlCounter %= 10;
        console.log(this.urlCounter);
        console.log(this.imgUrl);
      }, 3000);
    }

    extractURL(x: object): string {
      const s: string = JSON.stringify(x);

      interface MyObj {
        _index: string;
        _type: string;
        _id: string;
        _score: number;
        _source: {
          searchid: number;
          title: string;
          rent: string;
          geolocation: {
            lat: number;
            long: number;
          };
          images: Array<string>;
        };
        // albumId: number;
        // id: number;
        // title: string;
        // url: string;
        // thumbnailUrl: string;
      }

      const obj: MyObj = JSON.parse(s);
      return obj._source.images[0];
    }
}
