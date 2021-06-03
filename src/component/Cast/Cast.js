import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Cast extends Component {
  state = {
    movieId: "",
    filmActors: [],
  };

  async componentDidMount() {
    const apiKey = "5582cdfb391f31d3df38371c508e509b";

    this.setState({ movieId: this.props.match.params.movieId });

    const actors = await axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.props.match.params.movieId}/credits?api_key=${apiKey}`
      )
      .then((response) => response.data.cast);

    await this.setState({
      filmActors: [...actors],
    });
  }

  createActorsList = () => {
    const actorsArray = this.state.filmActors;
    return actorsArray.map((actor) => (
      <li key={actor.id} className="film_details__actors">
        <img
          src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${actor.profile_path}`}
          alt={actor.name}
        />
        <p>{actor.name}</p>
      </li>
    ));
  };

  componentWillUnmount() {
    this.setState({ movieId: "", filmActors: [] });
  }
  render() {
    return (
      <div>
        <ul>{this.createActorsList()}</ul>
      </div>
    );
  }
}

export default withRouter(Cast);

//<Trending apiKey="5582cdfb391f31d3df38371c508e509b" />;