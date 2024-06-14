import MovieUpcoming from "../components/Movie/MovieUpcoming";
import MovieTrend from "../components/Movie/MovieTrend";
import TVTrend from "../components/TV/TVTrend";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import { useNavigate } from 'react-router-dom';
import '../css/navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import '../css/searchBar.css'
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