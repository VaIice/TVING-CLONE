import TVTrend from "../components/TV/TVTrend";
import Footer from "../components/Layout/Footer";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import SearchPage from "./SearchModal";
import TVPopular from "../components/TV/TVPopular";
import TVTopRated from "../components/TV/TVTopRated";

function SeriesPage() {

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