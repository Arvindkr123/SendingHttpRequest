import React, { useCallback, useState, useEffect } from 'react';
import './App.css';
import MoviesList from './component/MoviesList.jsx';
import { VscLoading } from 'react-icons/vsc';

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const [retryTimer, setRetryTimer] = useState(null);

    const fetchMoviesHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setRetryCount(0);

        const retryDelay = 5000; // 5 seconds

        const retryApiCall = () => {
            clearTimeout(retryTimer);
            setRetryTimer(
                setTimeout(async () => {
                    try {
                        const response = await fetch('https://swapi.dev/api/films/');
                        if (!response.ok) {
                            throw new Error('Something went wrong!');
                        }

                        const data = await response.json();

                        const transformedMovies = data.results.map((movieData) => ({
                            id: movieData.episode_id,
                            title: movieData.title,
                            openingText: movieData.opening_crawl,
                            releaseDate: movieData.release_date,
                        }));
                        setMovies(transformedMovies);
                        setIsLoading(false);
                        setError(null);
                    } catch (error) {
                        setError(error.message);
                        setRetryCount((prevRetryCount) => prevRetryCount + 1);
                        retryApiCall();
                    }
                }),
                retryDelay
            );
        };

        retryApiCall();
    }, []);

    useEffect(() => {
        fetchMoviesHandler();
    }, [fetchMoviesHandler]);

    const cancelRetryHandler = () => {
        clearTimeout(retryTimer);
        setIsLoading(false);
    };
    
    let content = <p>Found no movies.</p>;

    if (movies.length > 0) {
        content = <MoviesList movies={movies} />;
    }

    if (error) {
        content = (
            <div>
                <p>{error}</p>
                <button onClick={fetchMoviesHandler}>Retry</button>
                <button onClick={cancelRetryHandler}>Cancel</button>
            </div>
        );
    }

    if (isLoading) {
        content = (
            <div>
                <VscLoading size={'35px'} /><br />
                <button onClick={cancelRetryHandler}>Cancel</button>
            </div>
        );
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>{content}</section>
        </React.Fragment>
    );
}

export default App;
