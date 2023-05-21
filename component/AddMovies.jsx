import React, { useRef } from 'react'
import classes from './AddMovies.module.css'

const AddMovies = (props) => {
    const titleRef = useRef('');
    const openingTextRef = useRef('');
    const releaseDateRef = useRef('');
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const movie = {
            title: titleRef.current.value,
            openingText: openingTextRef.current.value,
            releaseDate: releaseDateRef.current.value,
        }

        titleRef.current.value = ''
        openingTextRef.current.value = ''
        releaseDateRef.current.value = ''
        props.onAddMovie(movie)
    }
    return (
        <form onSubmit={onSubmitHandler}>
            <div className={classes.control}>
                <label htmlFor='title'>Title</label>
                <input type='text' id='title' ref={titleRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor='opening-text'>Opening Text</label>
                <textarea rows='5' id='opening-text' ref={openingTextRef}></textarea>
            </div>
            <div className={classes.control}>
                <label htmlFor='date'>Release Date</label>
                <input type='text' id='date' ref={releaseDateRef} />
            </div>
            <button>Add Movie</button>
        </form>
    )
}

export default AddMovies;
