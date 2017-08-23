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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListContainerComponent,
    ContainerButtonComponent,
    ListFilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
