import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../src/components/Header';
import Popular from '../src/components/Popular';
import TopRated from '../src/components/TopRated';
import UpcomingMovie from '../src/components/UpcomingMovie';
import MovieDetails from '../src/components/MovieDetails';



// context 
import MovieState from './context/MovieState';



function App() {
  return (
    <div className='App'>
      <MovieState>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path='/' element={<Popular/>}/>
            <Route path='/top-rated' element={<TopRated/>}/>
            <Route path='/upcoming-movies' element={<UpcomingMovie/>}/>
            <Route path='/movie-details/:movieId' element={<MovieDetails/>}/>
          </Routes>
        </BrowserRouter>
      </MovieState>
    </div>
  );
}

export default App;
