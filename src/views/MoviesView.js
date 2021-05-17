  
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { lazy, Suspense } from "react";
import style from "../styles/MoviesView.module.css";

const SearchResults = lazy(() =>
  import("../component/SearchResults/SearchResults")
);

class MoviesView extends Component {
  state = {
    searchWords: "",
    searchResults: [],
    display: false,
  };
  componentDidMount() {
    if (this.props.location.state !== null) {
      this.setState({
        searchWords: this.props.location.state.query,
        display: true,
      });
      this.onQueryChange(this.props.location.state.query);
      this.search(this.props.location.state.query);
    }
  }

  searchTextToState = (e) => {
    e.preventDefault();

    this.setState({ searchWords: e.target[0].value, display: true });
    this.onQueryChange(e.target[0].value);
    this.search(e.target[0].value);

    e.target.reset();
  };

  search(w) {
    const apiKey = "140aa2a61156d040b45d8a45da490f38";

    let arr = axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${w}&page=1&include_adult=false`
      )
      .then((response) => {
        if (this.state.searchResults !== response.data.results)
          this.setState({ searchResults: response.data.results });
      })
      .catch((error) => console.log(error));

    return arr;
  }

  onQueryChange = (query) => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `?query=${query}`,
    });
  };

  render() {
    console.log(this.state.searchWords);
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <form onSubmit={this.searchTextToState} type="submit">
            <input type="text" placeholder="Search..."></input>
            <button type="submit">Search</button>
          </form>
          <hr />
          <div>
            <h2 className={style.query}>{this.state.searchWords}</h2>
            <ul>
              {this.state.display && (
                <SearchResults
                  results={this.state.searchResults}
                  words={this.state.searchWords}
                />
              )}
              {this.state.searchWords !== "" && (
                <SearchResults
                  results={this.state.searchResults}
                  words={this.state.searchWords}
                />
              )}
            </ul>
          </div>
        </Suspense>
      </div>
    );
  }
}

export default withRouter(MoviesView);

//<Trending apiKey="5582cdfb391f31d3df38371c508e509b" />;
