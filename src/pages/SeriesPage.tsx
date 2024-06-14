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
import TVPopular from "../components/TV/TVPopular";
import TVTopRated from "../components/TV/TVTopRated";

function SeriesPage() {
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
              <TVTrend />
            <TVPopular />
            <TVTopRated />
              <Footer />
            </>
          )
      }
  </>
)
}

export default SeriesPage;