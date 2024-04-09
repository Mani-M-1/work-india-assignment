import './index.css';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'


const MovieDetails = () => {


    const {movieId} =  useParams();

    const [movieDetails, setMovieDetails] = useState({})

    const [cast, setCast] = useState([]);



    const getMovieDetails = async () => {
        const apiKey = "724c4ef0a3b40f64573350618feb467f";
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)

        if (response.ok) {
            setMovieDetails(data);
        } 
    }

    const getCastDetails = async () => {
        const apiKey = "724c4ef0a3b40f64573350618feb467f";
        const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)

        if (response.ok) {
            setCast(data.cast);
        } 
    }



    useEffect(() => {
        getMovieDetails();
        getCastDetails();
    }, [])




    const renderDetailsCard = (movieDetails) => {

        const getDate = (dateString) => {
            const date = new Date(dateString);
            // Array of day names
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

            // Array of month names
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            // Retrieve UTC day name, month name, and year from the Date object
            const utcDayName = dayNames[date.getUTCDay()];
            const utcMonthName = monthNames[date.getUTCMonth()];
            const utcDate = date.getDate();
            const utcYear = date.getUTCFullYear();

            return `${utcDayName} ${utcMonthName} ${utcDate} ${utcYear}`
        }
        
        return (
            <div className='movie-details-page__details-card'>
                <div className='movie-details-page__details-and-overview-wrapper'>
                    <div className='movie-details-page__movie-poster-and-details-wrapper'>
                        <img className='movie-details-page__movie-poster' src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt="movie img"/>
                        <div className='movie-details-page_details-card'>
                            <h1 className='movie-details-page__movie-title'>
                                {movieDetails.original_title}
                            </h1>
                            <p className='movie-details-page__movie-rating'>
                                Rating: {Math.floor(movieDetails.vote_average * 10) / 10}
                            </p>
                            <div className='movie-details-page__movie-time-and-genre'>
                                <p className='movie-details-page__movie-time'>{movieDetails.runtime} min</p>
                                {movieDetails.genres && <ul className='movie-details-page__movie-genre'>
                                    {movieDetails.genres.map(genre => <li key={genre.id} className='movie-details-page__movie-genre-items'>{genre.name},</li>)}
                                </ul>}
                            </div>
                            <p className='movie-details-page__movie-release-date'>
                                Release Date: {getDate(movieDetails.release_date)}
                            </p>
                            
                        </div>
                    </div>

                    <div className='movie-details-page__movie-overview-card'>
                        <h1 className='movie-details-page__movie-overview-heading'>
                            Overview
                        </h1>
                        <p className='movie-details-page__movie-overview'>
                            {movieDetails.overview}
                        </p>
                    </div>
                </div>
                <img className='movie-details-page__movie-backdrop-img' src={`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`} alt="movie img"/>
            </div>
        )
    }


    const CastItem = (props) => {
        const {eachItem} = props;
        const {name, character, profile_path} = eachItem;

        return (
            <li className='movie-details-page__cast-items'>
                <img className='movie-details-page__cast-img' src={`https://image.tmdb.org/t/p/w500/${profile_path}`} alt='cast img'/>
                <p className='movie-details-page__cast-name'>{name}</p>
                <p className='movie-details-page__cast-character'>Character: {character}</p>
            </li>
        )
    }

    return (
        <div className='movie-details-page__bg-container'>
            {renderDetailsCard(movieDetails)}
            
            <h1 className='movie-details-page__cast-heading'>
                Cast
            </h1>

            <ul className='movie-details-page__cast-items-wrapper'>
                {cast.map(eachItem => <CastItem key={eachItem.id} eachItem={eachItem}/>)}
            </ul>
            
            
        </div>
    )
}


export default MovieDetails;