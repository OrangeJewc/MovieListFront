import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';

import { MovieService } from './movie-service.service';
import { Movie } from './movie';
import { List } from './list';

import { InlineEditorComponent }  from 'ng2-inline-editor';
import { ClickOutsideDirective } from 'ng-click-outside';
import 'rxjs/Rx';

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

  loadingLists: boolean = true;
  
  constructor(
    private movieService: MovieService,
    private http: Http) { }

  ngOnInit() {
    this.loadLists();
    // let options = new RequestOptions({ body: '{"name" : "AWESOME MOVIE"}' });

    // this.http.post('https://movielistback.herokuapp.com/addList.php?name=MY AWESOME MOVIE&description=HEHE&userId=1', '').subscribe((res) => {
    //   console.log(res);
    // })
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

  loadLists() {
    this.http.get(`https://movielistback.herokuapp.com/getLists.php`).subscribe((res) => {
      // console.log(res.text());
      if(res.text() !== '0 results') {
        for(let i = 0; i < res.json().length; i++) {
          let r = res.json()[i];
          let l = new List();

          l.id = r.id;
          l.name = r.name;
          l.description = r.description;
          l.movies = r.movies ? r.movies : [];
          l.numMovies = r.movies ? r.movies.length : 0;

          this.lists.push(l);
        }
      }
      this.loadingLists = false;
    }, (err) => {
      this.loadingLists = false;
    })
  }

  newList() {
    let list = new List();

    if(this.lists.length == 0)
      list.id = 1;
    else
      list.id = this.lists[this.lists.length-1].id + 1;

    list.numMovies = 0;
    list.name = `Movie List ${list.id}`;
    list.description = `Click to change name and/or description!`;
    list.movies = [];

    this.http.post(`https://movielistback.herokuapp.com/addList.php?id=${list.id}&name=${list.name}&description=${list.description}&userId=1`, '').subscribe((res) => {
      console.log(res);
    })

    this.lists.push(list);
    console.log(this.lists);
  }

  deleteList(list) {
    let idx = this.lists.indexOf(list);
    
    if(idx == 0 && this.lists.length > 1)
      this.lists = this.lists.slice(1);
    else if(idx == 0)
      this.lists = [];
    else
      this.lists = this.lists.slice(0, idx).concat(this.lists.slice(idx+1));

    this.http.post(`https://movielistback.herokuapp.com/deleteList.php?id=${list.id}`, '').subscribe((res) => {
      console.log(res);
    })
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
    let m = this.selectedMovie;
    list.movies.push(m);
    
    let find = /[']/;
    let re = new RegExp(find, 'g');
    
    let title = m.title.replace(re, "\\'");
    let overview = m.overview.replace(re, "\\'");
    console.log(title, overview);

    this.http.post(`https://movielistback.herokuapp.com/addMovie.php?id=${m.id}&title=${title}&overview=${overview}&listId=${list.id}&releaseDate=${m.releaseDate}&posterPath=${m.posterPath}`, '').subscribe((res) => {
      console.log(res);
    })

    this.toggleListsView(null, false);
  }

  removeFromList(movie: Movie) {
    let idx = this.selectedList.movies.indexOf(movie);
    let list = this.selectedList.movies;
    
    if(idx == 0 && list.length > 1)
      list = list.slice(1);
    else if(idx == 0)
      list = [];
    else
      list = list.slice(0, idx).concat(list.slice(idx+1));

    this.selectedList.movies = list;
  }

  viewList(list: List) {
    this.selectedList = list;
  }

  blah(ev) {
    console.log(ev);
  }

}
