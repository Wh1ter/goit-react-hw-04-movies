import { Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import routes from "./routes";
import style from "./styles/app.module.css";

const HomeView = lazy(() => import("./views/HomeView"));
const MoviesView = lazy(() => import("./views/MoviesView"));
const NotFoundView = lazy(() => import("./views/NotFoundView"));
const MoviePageView = lazy(() => import("./views/MoviePageView"));

function App() {
  return (
    <div className={style.app}>
      <Suspense fallback={<div>Loading...</div>}>
        <nav>
          <li className={style.navItems}>
            <NavLink
              to={routes.home}
              className="navlink"
              activeClassName="navlink--axtive"
            >
              Home
            </NavLink>
          </li>
          <li className={style.navItems}>
            <NavLink
              to={routes.movies}
              className="navlink"
              activeClassName="navlink--active"
            >
              Movies
            </NavLink>
          </li>
        </nav>
        <hr />
        <Switch>
          <Route exact path={routes.home} component={HomeView} />
          <Route exact path={routes.movies} component={MoviesView} />
          <Route path={routes.film} render={() => <MoviePageView />} />
          <Route component={NotFoundView} />
        </Switch>
      </Suspense>
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