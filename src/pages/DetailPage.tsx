import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Footer from "../components/Layout/Footer";
import MovieTrend from "../components/Movie/MovieTrend";
import TVTrend from "../components/TV/TVTrend";
import SearchModal from "./SearchModal";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import MovieDetail from "../components/Movie/MovieDetail";
import TVDetail from "../components/TV/TVDetail";

function DetailPage() {
  const isClickedSearchIcon= useSelector( (state :RootState) => state.isClickedSearchIcon);
  const { pathname } = useLocation();

  function ScrollToTop() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]); // pathname이 변경될 때마다 실행

    return null;
  }

return (
  <>
    <ScrollToTop />
    {isClickedSearchIcon ? (
      <SearchModal />
    ) : (
      <>
        {pathname[8] === 'M' ? <MovieDetail /> : <TVDetail />}
        <MovieTrend />
        <TVTrend />
        <Footer />
      </>
    )}
  </>
)
}

export default DetailPage;
