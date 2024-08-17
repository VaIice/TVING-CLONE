import MovieTrend from "../components/Movie/MovieTrend";
import Footer from "../components/Layout/Footer";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import SearchPage from "./SearchModal";
import MoviePopular from "../components/Movie/MoviePopular";
import MovieTopRated from "../components/Movie/MovieTopRated";

function MoviePage() {
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