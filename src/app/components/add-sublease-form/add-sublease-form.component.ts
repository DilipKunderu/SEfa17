import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { DatepickerOptions } from 'ng2-datepicker';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { HouseListingService } from '../../house-listing.service';
import { BasicDetails } from '../../subleaseForm01';
import { MouseEvent as AGMMouseEvent } from '@agm/core';


const URL = 'http://174.64.102.57:3000/leasemetadata';

@Component({
  selector: 'app-add-sublease-form',
  templateUrl: './add-sublease-form.component.html',
  styleUrls: ['./add-sublease-form.component.css']
})

export class AddSubleaseFormComponent implements OnInit {
// google maps zoom level
zoom: number = 8;
// initial center position for the map
lat: number = 51.673858;
lng: number = 7.815982;

clickedMarker(label: string, index: number) {
  console.log(`clicked the marker: ${label || index}`)
}

mapClicked($event: AGMMouseEvent) {
  this.data.markers.length = 0;
  this.data.markers.push({
    lat: $event.coords.lat,
    lng: $event.coords.lng,
    label: 'D',
    draggable: true
  });
}

markerDragEnd(m: Marker, $event: MouseEvent) {
  console.log('dragEnd', m, $event);
}

  numArray: Array<number> = [1, 2, 3, 4, 5];
  filesToUpload: Array<File> = [];

  selectedValue: string;

  homeTypes: Array<object> = [
    {
      description: 'Apartment',
      id: 1
    },
    {
      description: 'Private room',
      id: 2
    },
    {
      description: 'Shared room',
      id: 3
    },
    {
      description: 'Studio Apartment',
      id: 4
    }
  ];

  selectedEntry: { [key: string]: any } = {
    value: null,
    description: null
  };

    numArray1 = [
      {value: 'option-1', viewValue: '1'},
      {value: 'option-2', viewValue: '2'},
      {value: 'option-3', viewValue: '3'},
      {value: 'option-4', viewValue: '4'},
      {value: 'option-5', viewValue: '5'},
    ];

    numArray2 = [
      {value: 'option-1', viewValue: '1'},
      {value: 'option-2', viewValue: '2'},
      {value: 'option-3', viewValue: '3'},
      {value: 'option-4', viewValue: '4'},
      {value: 'option-5', viewValue: '5'},
    ];

    numArray3 = [
      {value: 'option-1', viewValue: '1'},
      {value: 'option-2', viewValue: '2'},
      {value: 'option-3', viewValue: '3'},
      {value: 'option-4', viewValue: '4'},
      {value: 'option-5', viewValue: '5'},
    ];


    numArray4 = [
      {value: 'option-1', viewValue: '1'},
      {value: 'option-2', viewValue: '2'},
      {value: 'option-3', viewValue: '3'},
      {value: 'option-4', viewValue: '4'},
      {value: 'option-5', viewValue: '5'},
    ];

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });

  res_id: string;

  model = new BasicDetails(
    '',
   '10016',
    'this is the description',
     'accomodates is here',
      '', '','', '', '', true, false, true, false, true, true,
    true, false, true, true, false, true, true, true, true, true, true, 'rent11', new Date(), new Date());

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  public searchControl: FormControl;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private data: HouseListingService) {}

  ngOnInit() {
      // select the first one
      if(this.homeTypes) {
        this.onSelectionChange(this.homeTypes[0]);  
      }

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
    };
    this.searchControl = new FormControl();

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
  }

  onSelectionChange(entry) {
    // clone the object for immutability
    this.selectedEntry = Object.assign({}, this.selectedEntry, entry);
    // console.log(this.selectedEntry.description);
    this.model.roomtype = this.selectedEntry.description;
    // console.log(this.model.roomtype);
  }

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);

    for (let i = 0; i < files.length; i++) {
        formData.append('uploads[]', files[i], files[i]['name']);
    }

    formData.append('rent', 500);
    formData.append('lat', 39);
    formData.append('lon', 80);
    formData.append('startdate', '2017-08');
    formData.append('enddate', '2018-03');
    formData.append('searchid', '1234');
    formData.append('title', 'sefwefwe');

    console.log('form data variable :   ' + formData.toString());

        this.http.post(URL, formData)
        .subscribe(files1 => console.log('files', files1))
}

    fileChangeEvent(fileInput: any) {
      this.filesToUpload = <Array<File>>fileInput.target.files;
    }

  onStartDateChange() { 
    console.log(this.model.start_date);
  }
  onEndDateChange() { 
    console.log(this.model.end_date);
  }
}


interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
