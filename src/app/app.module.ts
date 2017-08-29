import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListContainerComponent } from './list-container/list-container.component';
import { ContainerButtonComponent } from './list-container/container-button/container-button.component';
import { ListFilterComponent } from './list-container/list-filter/list-filter.component';
import { MovieService } from './list-container/movie-service.service';

import { InlineEditorModule } from 'ng2-inline-editor';
import { ClickOutsideModule } from 'ng-click-outside';
import { UserComponent } from './user/user.component';

import { NewUserComponent } from './user/new-user/new-user.component';
import { UserService } from './user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListContainerComponent,
    ContainerButtonComponent,
    ListFilterComponent,
    UserComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InlineEditorModule,
    ClickOutsideModule
  ],
  providers: [
    MovieService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
