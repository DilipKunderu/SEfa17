import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { DatepickerOptions } from 'ng2-datepicker';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { HouseListingService } from '../../house-listing.service';
import { BasicDetails } from '../../subleaseForm01';
import { MouseEvent as AGMMouseEvent } from '@agm/core';

const URL = 'http://70.171.46.158:3000/leasemetadata';

@Component({
  selector: 'app-add-sublease-form',
  templateUrl: './add-sublease-form.component.html',
  styleUrls: ['./add-sublease-form.component.css']
})

export class AddSubleaseFormComponent implements OnInit {
  device:number = 1;

  amenities: Array<any> = [
    {
      amenity: 'Internet',
      value: 1
    },
    {
      amenity: 'Air conditioning',
      value: 0
    },
    {
      amenity: 'Washer/Dryer',
      value: 1
    },
    {
      amenity: 'Free parking on premises',
      value: 0
    },
    {
      amenity: 'Wheelchair Accessible',
      value: 0
    },
    {
      amenity: 'Private bathroom',
      value: 0
    },
    {
      amenity: 'Pool',
      value: 0
    },
    {
      amenity: 'Gym',
      value: 0
    },
  ];
  
    onToggleChange(x: number) {
          if (this.amenities[x].value == 1) {
            this.amenities[x].value = 0;
            console.log(0);
          } else {
            this.amenities[x].value = 1;
            console.log(1);
          }
      }


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
    true, false, true, true, false, true, true, true, true, true, true, 'rent11', new Date(), new Date()
  ,'50', '70');

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

    formData.append('title', this.model.title);
    formData.append('owner','Saptarshi');
    formData.append('rent', this.model.rent);
    formData.append('lat', this.model.lat);
    formData.append('lon', this.model.lon);
    formData.append('email', 'saptarshi@email');
    formData.append('zipcode', this.model.zipcode);
    formData.append('description', this.model.description);
    formData.append('startdate', this.model.start_date.getFullYear() + '-' + this.model.start_date.getMonth());
    formData.append('enddate', this.model.end_date.getFullYear() + '-' + this.model.end_date.getMonth());
    formData.append('roomtype', this.model.roomtype);
    formData.append('bathrooms', this.model.bathrooms);
    formData.append('bedrooms', this.model.bedrooms);
    formData.append('internet', true);
    formData.append('airconditioning', true);
    formData.append('washer_dryer', true);
    formData.append('free_parking_on_premises', true);
    formData.append('private_bathroom', true);
    formData.append('wheelchair_accessible', true);
    formData.append('pool', true);
    formData.append('gym', true);

    console.log('form data variable :   ' + formData.toString());

        this.http.post('http://70.171.46.158:3000/lease'
        , formData)
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
