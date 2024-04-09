import './index.css';
import { Link } from 'react-router-dom';


const MovieItem = (props) => {
        const {movieDetails} = props;
        const {id, poster_path, original_title, vote_average} = movieDetails;

        return (
            <li className='movie-item-page__movie-items'>
                <Link to={`/movie-details/${id}`} className='movie-item-page__movie-link-items'>
                    <img className='movie-item-page__movie-image' src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="movie img" />
                    <p className='movie-item-page__movie-title'>
                        {original_title}
                    </p>
                    <p className='movie-item-page__movie-rating'>
                        Rating: {Math.floor(vote_average * 10) / 10}
                    </p>
                </Link>
            </li>
        )
    }


export default MovieItem;