import MainPage from './pages/MainPage';
import { Routes, Route, BrowserRouter, Navigate, useLocation, useNavigate } from "react-router-dom";
import SearchPage from './pages/SearchPage';
import SeriesPage from './pages/SeriesPage';
import MoviePage from './pages/MoviePage';
import DetailPage from './pages/DetailPage';
import Header from './components/Layout/Header';
import MovieTrailer from './components/Movie/MovieTrailer';
import TVTrailer from './components/TV/TVTrailer';

function App() {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
\        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/movie" element={<MoviePage />} />
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/search/:keyword" element={<SearchPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/detail/trailer/:id" element={<TVTrailer />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>   
      </BrowserRouter>
    </>
  );
}

export default App;
