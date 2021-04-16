import React, { Component } from "react";
import { getMovies } from "../services/fakeMovie";
import { getGenres } from "../services/fakeGeneres";
import MoviesTable from "./moviesTable";
import Pagination from "../common/pagination";
import { paginate } from "../utilties/paginate";
import ListGroup from "../common/listGroup";
import _ from "lodash";

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      selectedGenre: null,
      currentPage: 1,
      pageSize: 4,
      sortColumn: { path: "title", order: "asc" },
    };
  }

  componentDidMount() {
    const genres = [{ _id: "", name: "All Movies" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleDelete = (movie) => {
    const { movies } = this.state;
    let updatedMovie = movies.splice(movies.indexOf(movie), 1);
    this.setState({ movie: updatedMovie });
  };

  handleToggle = (movie) => {
    const { movies } = this.state;
    let index = movies.indexOf(movie);
    let updatedMovie = [...movies];
    if (updatedMovie[index].liked) updatedMovie[index].liked = false;
    else updatedMovie[index].liked = true;
    this.setState({ movie: updatedMovie });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const count = this.state.movies.length;
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      selectedGenre,
      sortColumn,
    } = this.state;

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {count > 0 ? (
            <h4>There is {count} movie in the database</h4>
          ) : (
            <h4>There is no movie in the database</h4>
          )}
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onToggle={this.handleToggle}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            pageSize={pageSize}
            totalCount={filteredMovies.length}
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

export default MovieList;
