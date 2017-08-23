import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

const API_KEY = '46ff0d4cd1e37b6cf6c49cbbf856858c';
const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

@Injectable()
export class MovieService {

  constructor(private http: Http) { }

  search(term) {
    // console.log(`${API_URL}${term}`);
    return this.http.get(`${API_URL}${term}`);
  }

}
