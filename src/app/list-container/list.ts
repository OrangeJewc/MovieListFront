import { Movie } from './movie';

export class List {
  id: number;
  name: string;
  description: string;
  numMovies: number;
  movies: Movie[];
}