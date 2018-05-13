import { IPhotos } from './../interfaces/photosInterface';
import { PhotosService } from './../services/photos.service';
import { UsersService } from './../services/users.service';
import { IUser } from './../interfaces/userInterface';
import { AlbumsService } from './../services/albums.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { IAlbums } from '../interfaces/albumInterface';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  private userId = 0;
  private albumId = 0;
  public activeUser: IUser;
  public activeAlbum: IAlbums;
  public photos: IPhotos[] = [];

  constructor(
    private _actRoute: ActivatedRoute,
    private _albumSrv: AlbumsService,
    private _userSrv: UsersService,
    private _photoSrv: PhotosService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getActivIds(); // get the user and album id from the url
    this.getActiveAlbum();  // get the active album
    this.getActiveUser();  // get the active user
    this.getPhotos(); // get the photos of the active album
  }

  // get the user and album id from the url
  getActivIds() {
    // subscribing to the active route paramters and use it to get the userId and albumId
    this._actRoute.paramMap.subscribe((params: ParamMap) => {
      this.userId = parseInt(params.get('userId'), 10); // 10 to parse it as a decimel number
      this.albumId = parseInt(params.get('albumId'), 10);
    });
  }

  // get only the active album
  getActiveAlbum() {
    this._albumSrv.getAlbums().subscribe(
      albumData => {
        for (const album of albumData) { // looping through all the albums
          if (album.id === this.albumId) { // search for activealbum using the albumId
            this.activeAlbum = album;
          }
        }
        console.log('Album');
        console.log(this.activeAlbum);
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

  // get only the active album's photos
  getPhotos() {
    this._photoSrv.getPhotos().subscribe(
      photoData => {
        for (const photo of photoData) {
          if (photo.albumId === this.albumId) {
            this.photos.push(photo);
          }
        }
        console.log('Album');
        console.log(this.photos);
      });
  }

}
