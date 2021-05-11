import axios from "axios";
import { Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";
import Trending from "./component/Trending/Trending";
import HomeView from "./views/HomeView";
import MoviesView from "./views/MoviesView";
import NotFoundView from "./views/NotFoundView";
import MoviePageView from "./views/MoviePageView";
import Actors from "./component/Actors/Actors";

const apiKey = "5582cdfb391f31d3df38371c508e509b";

function App() {
  return (
    <div className="App">
      <nav>
        <li>
          <NavLink to="/" className="navlink" activeClassName="navlink--axtive">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className="navlink"
            activeClassName="navlink--axtive"
          >
            Movies
          </NavLink>
        </li>
      </nav>
      <Switch>
        <Route exact path="/" component={HomeView} />
        <Route
          path="/movies/:movieId"
          render={(props) => <MoviePageView {...props} />}
        />

        <Route exact path="/movies" component={MoviesView} />
        <Route component={NotFoundView} />
      </Switch>
    </div>
  );
}

export default App;

// Ключ API (v3 auth)
// 5582cdfb391f31d3df38371c508e509b
// Пример API-запроса
// https://api.themoviedb.org/3/movie/550?api_key=5582cdfb391f31d3df38371c508e509b
// Ключ доступа к API (v4 auth)
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTgyY2RmYjM5MWYzMWQzZGYzODM3MWM1MDhlNTA5YiIsInN1YiI6IjYwOTY4NjQzYjM0NDA5MDAzY2I3MjdlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CGahy0s94BdhcOmVN4o-cvydw5XelVKMaboLdIDOVLc