import { Component, OnInit, ViewChild } from '@angular/core';

import { MovieService } from './movie-service.service';
import { Movie } from './movie';

// import 'rxjs/add/operator/map';

const IMG_URL = `https://image.tmdb.org/t/p/w500`;

@Component({
  selector: 'list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.css']
})
export class ListContainerComponent implements OnInit {

  listButtonActive: boolean = true;
  searchButtonActive: boolean = false;
  @ViewChild('listFilter') listFilter: any;
  @ViewChild('movieSearch') movieSearch: any;
  movieList: Movie[];
  
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

}
