import React, { useState } from 'react'
import './App.css'
import MoviesList from './component/MoviesList.jsx'
import {VscLoading} from 'react-icons/vsc'

const App = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchMoviesHandler = async () => {
        setLoading(true);
        const response = await fetch('https://swapi.dev/api/films/');
        const data = await response.json();
 
        const transformedMovies = data.results.map((movieData) => {
            return {
                id: movieData.episode_id,
                title: movieData.title,
                releaseDate: movieData.release_date,
                openingText: movieData.opening_crawl
            }
        })

        setMovies(transformedMovies);
        setLoading(false);
    }



    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>
                {!loading && movies.length > 0 &&  <MoviesList movies={movies} />}
                {loading && <VscLoading size={'40px'}/>}
            </section>
        </React.Fragment>
    )
}

export default App;
