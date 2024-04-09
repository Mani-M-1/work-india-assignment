import './index.css';
import { useState, useEffect, useContext } from 'react';


import movieContext from '../../context/movieContext';



import MovieItem from '../MovieItem';


const UpcomingMovie = () => {
    const movieDetailsFromContext = useContext(movieContext);


    const movieName = movieDetailsFromContext.state.trim();

    const [upcomingMovies, setUpcomingMovies] = useState([]);

    const getFilteredMovies = async () => {
        const apiKey = "724c4ef0a3b40f64573350618feb467f";
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieName}&page=1`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)

        if (response.ok) {
            setUpcomingMovies(data.results);
        }
    }

    const getAllMovies = async () => {
        console.log(movieDetailsFromContext.state.trim())
        const apiKey = "724c4ef0a3b40f64573350618feb467f";
        const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (response.ok) {
            setUpcomingMovies(data.results);
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
        <div className='upcoming-movie-page__bg-container'>
            <ul className='upcoming-movie-page__movies-card'>
                {upcomingMovies.map(movie => <MovieItem key={movie.id} movieDetails={movie} />)}
            </ul>
        </div>
    )
}


export default UpcomingMovie;