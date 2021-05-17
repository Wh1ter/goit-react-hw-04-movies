import React, { Component } from "react";
import { Route } from "react-router";
import { Link, withRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import style from "../../styles/FilmInfo.module.css";

const MovieDetailsPage = lazy(() => import("../../views/MovieDetailsPage"));
//import MovieDetailsPage from "../../views/MovieDetailsPage";

class FilmInfo extends Component {
  state = {};
  createGenresList = () => {
    const genresArray = this.props.dataFilm.filmGenres;
    return genresArray.map((genre) => (
      <li key={genre.name} className="film_details__genre">
        {genre.name}
      </li>
    ));
  };
  forSearch() {
    if (this.props.location.state.query) {
      let a = this.props.location.state.query;
      return a;
    }
  }
  render() {
    console.log(`movies/${this.props.match.params.movieId}`);
    const allProps = this.props.dataFilm;
    return (
      <div className="film">
        <Suspense fallback={<div>Loading...</div>}>
          <button onClick={() => this.props.fn(this.props)}>← Go back</button>
          <div className={style.film_info}>
            <div className={style.film_poster}>
              <img
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${allProps.filmPoster}`}
                alt="1"
              />
            </div>
            <div className={style.film_details}>
              <h1 className="film_details__title">{allProps.filmTitle}</h1>
              <p className="film_details__info">{`User Score: ${
                allProps.filmUserScore * 10
              }%`}</p>
              <h2 className="film_details__info_title">Overview</h2>
              <p className="film_details__info">{allProps.filmOverview}</p>
              <h2 className="film_details__info_title">Genres</h2>
              <ul>{this.createGenresList()}</ul>
              <p className="film_details__info"></p>
            </div>
          </div>
          <div>
            <h2 className="film_details__info_title">Additonal information</h2>
            <ul>
              {console.log(this.props.match.url)}
              <Link
                to={{
                  pathname: `${this.props.match.url}/cast`,
                  search: this.props.location.search,
                  state: {
                    from: `/movies`,
                    query: this.props.location.state.query,
                  },
                }}
              >
                <li key="cast101">Cast</li>
              </Link>

              <Link
                to={{
                  pathname: `${this.props.match.url}/reviews`,
                  state: {
                    from: `/movies`,
                    query: this.props.location.state.query,
                  },
                }}
              >
                <li key="revs102">Reviews</li>
              </Link>
            </ul>
          </div>
          <div>
            <Route
              path="/movies/:movieId/cast"
              render={() => <MovieDetailsPage detail="cast" />}
            />
            <Route
              exact
              path="/movies/:movieId/reviews"
              render={() => <MovieDetailsPage detail="reviews" />}
            />
          </div>
        </Suspense>
      </div>
    );
  }
}
FilmInfo.propTypes = {
  dataFilm: PropTypes.object,
  fn: PropTypes.func.isRequired,
};
FilmInfo.defaultProps = {
  dataFilm: {},
};

export default withRouter(FilmInfo);

//<Trending apiKey="5582cdfb391f31d3df38371c508e509b" />;