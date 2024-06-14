import './App.css';
import MainPage from './pages/MainPage';
import Navbar from './components/Navbar';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SearchPage from './pages/SearchPage';
import SeriesPage from './pages/SeriesPage';
import MoviePage from './pages/MoviePage';
import RecentSearch from './components/Search/RecentSearch';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/movie" element={<MoviePage />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/search/:keyword" element={<SearchPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>   
    </>
  );
}

export default App;
