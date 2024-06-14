import MovieUpcoming from "../components/Movie/MovieUpcoming";
import MovieTrend from "../components/Movie/MovieTrend";
import TVTrend from "../components/TV/TVTrend";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import SearchPage from "./SearchModal";
import MoviePopular from "../components/Movie/MoviePopular";
import MovieTopRated from "../components/Movie/MovieTopRated";

function MoviePage() {
  const dispatch = useDispatch();

  const onClickProfile = () => {
    window.location.href = 'https://github.com/VaIice';
  }

  const isClickedSearchIcon= useSelector( (state :RootState) => state.isClickedSearchIcon);
return (
  <>
      {
          isClickedSearchIcon ? (
            <SearchPage/>
          ) : (
            <>
              <MovieTrend />
              <MoviePopular />
              <MovieTopRated />
              <Footer />
            </>
          )
      }
  </>
)
}

export default MoviePage;