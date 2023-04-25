import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userList;
  userForm;

  constructor(public http: HttpClient) {
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.getUsers();
  }
  getError() {
    var data = JSON.stringify({
      "id": 1,
      "available": 'sfalse',
      "brand": "Lamborgini",
      "color": "Yellow",
      "first_release_date": "2010-09-17",
      "price": 11436,
      "type": "MPV",
      "additional_features": [
        "GPS",
        "Alarm"
      ],
      "fuel_type": "Petrol",
      "horse_power": 197,
      "serial_number": "SN0000001",
      "tyres": [
        {
          "manafacturer": "Apollo",
          "diameter": 17
        },
        {
          "manafacturer": "Dunlop",
          "diameter": 17
        },
        {
          "manafacturer": "Goodyear",
          "diameter": 16
        }
      ]
    });
    //debugger;
    this.http.post('http://api.34.100.229.30.sslip.io/api/v1/user/fail/',data).subscribe(  res => console.log('success', res),
    error => console.log('oops', error));
  }
  getUsers() {
   // debugger;
    this.http.get('http://localhost:8081/user').subscribe(
      res => console.log('success', res),
      error => console.log('oops', error)
    );
  }

  onSubmit() {
    //debugger;
    if (this.userForm.valid) {
      this.http
        .post('http://localhost:8081/user', this.userForm.value)
        .subscribe((res) => {
          if(res){
            this.getUsers();
          }
        });
        this.userForm.reset();
    }
  }

  onDelete(userId) {
    this.http.delete('http://localhost:8081/user/' + userId).subscribe((res) => {
      if(res){
        this.getUsers();
      }
    });
  }
}
