import { UsersService } from './../services/users.service';
import { IUser } from './../interfaces/userInterface';
import { AlbumsService } from './../services/albums.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { IAlbums } from '../interfaces/albumInterface';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})

export class AlbumsComponent implements OnInit {
  private userId = 0;
  public albums: IAlbums[] = [];
  public activeUser: IUser;

  constructor(
    private _actRoute: ActivatedRoute,
    private _albumSrv: AlbumsService,
    private _userSrv: UsersService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getUserId(); // get the user id from the url
    this.getActiveUser(); // get the active user
    this.getAlbums(); // get the albums of the active user
  }

  // get the user id from the url
  getUserId() {
    // subscribing to the active route paramters and use it to get the userId
    this._actRoute.paramMap.subscribe((params: ParamMap) => {
      this.userId = parseInt(params.get('userId'), 10); // 10 to parse it as a decimel number
    });
  }

  // get only the active user
  getActiveUser() {
    this._userSrv.getUsers().subscribe(
      usersData => {
        for (const user of usersData) { // looping through all the users
          if (user.id === this.userId) { // search for activeuser using the activeUserId
            this.activeUser = user;
          }
        }
      });
  }
// get only the active user's albums
  getAlbums() {
    this._albumSrv.getAlbums().subscribe(
      data => {
        for (const album of data) {
          if (album.userId === this.userId) {
            this.albums.push(album);
          }
        }
      },
      error => {
        console.log('Error ' + error);
      }
    );
  }


  onSelect(albumId: number) {
    // relativeTo used to append the wanted route to the current one
    this._router.navigate(['album', albumId], { relativeTo: this._actRoute });
  }
}
