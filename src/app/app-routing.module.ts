import { PhotosComponent } from './photos/photos.component';
import { AlbumsComponent } from './albums/albums.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'user/:userId', // component-less path to act as a host to its childern
    children: [
      {path: '', component: AlbumsComponent},
      { path: 'album/:albumId' , component: PhotosComponent}
    ]
  }
  // ,{path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export the components used in routing togather as 1 constant
export const RoutingComponents = [HomeComponent, AlbumsComponent, PhotosComponent];
