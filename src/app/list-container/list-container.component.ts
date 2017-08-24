import { Component, OnInit, ViewChild } from '@angular/core';

import { MovieService } from './movie-service.service';
import { Movie } from './movie';
import { List } from './list';

import { InlineEditorComponent }  from 'ng2-inline-editor';
import { ClickOutsideDirective } from 'ng-click-outside';

// import 'rxjs/add/operator/map';

const IMG_URL = `https://image.tmdb.org/t/p/w500`;

@Component({
  selector: 'list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.css']
})
export class ListContainerComponent implements OnInit {

  editableText: string;

  listButtonActive: boolean = true;
  searchButtonActive: boolean = false;

  @ViewChild('listFilter') listFilter: any;
  @ViewChild('movieSearch') movieSearch: any;

  movieList: Movie[];
  lists: List[] = [];

  listsMenuOpen: boolean = false;
  selectedMovie: Movie;
  selectedList: List;
  
  constructor(private movieService: MovieService) { }

  ngOnInit() {
  }

  select(btn) {
    if(btn == 1) {
      this.listButtonActive = true;
      this.searchButtonActive = false;
    } else {
      this.listButtonActive = false;
      this.searchButtonActive = true;
    }
  }

  setMovieList(movies) {
    movies.map(movie => {
      let tmp: Movie = {
        id: movie.id,
        language: movie.original_language,
        title: movie.title,
        rating: movie.vote_average,
        rateCount: movie.vote_count,
        overview: movie.overview,
        releaseDate: movie.release_date,
        posterPath: `${IMG_URL}${movie.poster_path}`
      }
      console.log(movie);
      this.movieList.push(tmp);
    })
  }

  update(type) {
    if(type === 'list') {

    } else if(type === 'movie') {
      let query = this.movieSearch.searchTerm.split(' ').join('+');
      this.movieList = [];
      let movies = [];

      this.movieService.search(query).subscribe((res) => {
        movies = res.json().results;
        this.setMovieList(movies);
      });
    }
  }

  newList() {
    let list = new List();

    if(this.lists.length == 0)
      list.id = 1;
    else
      list.id = this.lists[this.lists.length-1].id + 1;

    list.numMovies = 0;
    list.name = `Movie List ${list.id}`;
    list.description = `List Description...`;
    list.movies = [];

    this.lists.push(list);
  }

  deleteList(list) {
    let idx = this.lists.indexOf(list);
    
    if(idx == 0 && this.lists.length > 1)
      this.lists = this.lists.slice(1);
    else if(idx == 0)
      this.lists = [];
    else
      this.lists = this.lists.slice(0, idx).concat(this.lists.slice(idx+1));
  }

  toggleListsView(movie: Movie, status) {
    if(movie != null) {
      document.getElementsByTagName('body')[0].style.backgroundColor = "#000";
    } else {
      document.getElementsByTagName('body')[0].style.backgroundColor = "#333";
    }

    this.listsMenuOpen = status;
    this.selectedMovie = movie;
  }

  addToList(list: List) {
    list.movies.push(this.selectedMovie);
    this.toggleListsView(null, false);
  }

  viewList(list: List) {
    this.selectedList = list;
  }

  blah(ev) {
    console.log(ev);
  }

}
