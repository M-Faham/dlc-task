import { Iaddress } from './../interfaces/addressInterface';
import { IUser } from './../interfaces/userInterface';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public users: IUser[] = []; // container for the users from the api
  newUserForm: FormGroup; // object of type FormGroup to use it in the home page to add users
  private address: Iaddress = { city: '1', street: '2', suite: '3' }; // intalizing an address to use it in the user variable

  private user: IUser = {  // intializing the user to not get undefined error
    id: 0, name: '1', email: '2', phone: '3', address: this.address
  };


  constructor(
    private _userService: UsersService, // injector for the UsersService
    private _router: Router
  ) { }

  ngOnInit() {
    this.getUsers(); // get users from the api and store in the users: Iuser []
    this.userForm(); // create a form and sets it's validators
  }

  // getusers from the API
  getUsers() {
    this._userService.getUsers().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log('Error ' + error);
      }
    );
  }


  onSelect(id: number) {
    this._router.navigate(['/user', id]); // navigate to user page
  }

  userForm() {
    this.newUserForm = new FormGroup({
      'name': new FormControl(null, Validators.required), //  Validators.required: making sure that the field is required
      'email': new FormControl(null, [Validators.required, Validators.email]), //  Validators.email: email format
      'phone': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
      'street': new FormControl(null, Validators.required),
      'suite': new FormControl(null, Validators.required)
    });
  }

  onSubmit() { // call the post function and add the new user to the users[]
    if (this.newUserForm.status === 'VALID') { // check if all the validators in the form are VALID

      this.user.id = 1 + this.users.length; // setting the user.id
      this.user.name = this.newUserForm.value.name; // filling the 'user' variable with the entered data
      this.user.phone = this.newUserForm.value.phone;
      this.user.email = this.newUserForm.value.email;
      this.user.address.city = this.newUserForm.value.city;
      this.user.address.suite = this.newUserForm.value.suite;
      this.user.address.street = this.newUserForm.value.street;

      //
      this._userService.addUser(this.user) // calling the adduser
      .subscribe(user => console.log(user), error => console.log(error)); // subscribing to the post function console loggin the response
      this.users.push(this.user); // pushing the new user to users array in case the API does't post
    }
    this.newUserForm.reset(); // reset the form to it's intiall values
  }


}
