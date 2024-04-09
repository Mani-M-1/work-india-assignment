import './index.css';
import { useState, useEffect, useContext } from 'react';


import movieContext from '../../context/movieContext';


import MovieItem from '../MovieItem';


const Popular = () => {
    const movieDetailsFromContext = useContext(movieContext);

    const movieName = movieDetailsFromContext.state.trim();

    const [popularMovies, setPopularMovies] = useState([]);

    const getFilteredMovies = async () => {
        const apiKey = "724c4ef0a3b40f64573350618feb467f";
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieName}&page=1`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)

        if (response.ok) {
            setPopularMovies(data.results);
        }
    }

    const getAllMovies = async () => {
        const apiKey = "724c4ef0a3b40f64573350618feb467f";
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            setPopularMovies(data.results);
        }
    }

    if (movieDetailsFromContext.state.trim() !== "") {
        getFilteredMovies();
    }
    else {
        getAllMovies()
    }



    useEffect(() => {
        getAllMovies()
    }, [])


    return (
        <div className='popular-page__bg-container'>
            <ul className='popular-page__movies-card'>
                {popularMovies.map(movie => <MovieItem key={movie.id} movieDetails={movie} />)}
            </ul>
        </div>
    )
}


export default Popular;