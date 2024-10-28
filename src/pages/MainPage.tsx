import MovieUpcoming from "../components/Movie/MovieUpcoming";
import MovieTrend from "../components/Movie/MovieTrend";
import TVTrend from "../components/TV/TVTrend";
import Footer from "../components/Layout/Footer";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import SearchModal from "./SearchModal";

function MainPage() {
  const isClickedSearchIcon= useSelector( (state :RootState) => state.isClickedSearchIcon);
  return (
    <>
        {
            isClickedSearchIcon ? (
              <SearchModal/>
            ) : (
              <>
                <MovieUpcoming />
                <MovieTrend />
                <TVTrend />
                <Footer />
              </>
            )
        }
    </>
  )
}

export default MainPage;