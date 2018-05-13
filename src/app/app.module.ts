// ---- Modules
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// ---- Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

// ---- Seriveces
import { AlbumsService } from './services/albums.service';
import { UsersService } from './services/users.service';
import { PhotosService } from './services/photos.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RoutingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    UsersService,
    PhotosService,
    AlbumsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
