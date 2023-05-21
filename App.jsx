import React, { useState } from 'react'
import './App.css'
import MoviesList from './component/MoviesList.jsx'

const App = () => {
    const [movies, setMovies] = useState([]);
    const fetchMoviesHandler = () => {
        fetch('https://swapi.dev/api/films/').then(response => {
           return response.json();
        }).then((data) => {
            const transfromedMovies = data.results.map((movieData) => {
                return {
                    id: movieData.episode_id,
                    title: movieData.title,
                    releaseDate: movieData.release_date,
                    openingText: movieData.opening_crawl
                }
            })
            setMovies(transfromedMovies);
        })
    }


    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>
                <MoviesList movies={movies} />
            </section>
        </React.Fragment>
    )
}

export default App;
