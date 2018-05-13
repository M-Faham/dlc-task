import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IUser } from '../interfaces/userInterface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { catchError } from 'rxjs/operators';


@Injectable()
export class UsersService {

  private _url = '/assets/data/db.json';  // url to the API local to make my own data doesn't accept Post

  // private _url = 'http://localhost:3004/users'; // use this if you want to use post

  // url to the API using json-server located in the db.json on root directory of the app

  constructor(private _http: HttpClient) { }

  getUsers() {
    return this._http.get(this._url) // send get request to the API
      .catch(this.errorHandle);
  }

  errorHandle(error: HttpErrorResponse) { // returns an error message
    return Observable.throw(error.message || 'Server-Side Error');
  }

  addUser(user: IUser): Observable<IUser> {// take a user and  post it to the API works only in the json-server API
    return this._http.post<IUser>(this._url, user);
  }
}
