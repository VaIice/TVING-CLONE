import { useSelector } from "react-redux";
import RecentSearch from "../components/Search/RecentSearch";
import SearchBar from "../components/Search/SearchBar";
import { RootState, trueIsSearchResultPage } from "../store/store";
import MovieSearchResult from "../components/Movie/MovieSearchResult";
import TVSearchResult from "../components/TV/TVSearchResult";
import Footer from "../components/Footer";
import { useEffect } from "react";

function SearchPage() {

  return (
    <>
      <SearchBar />
      <MovieSearchResult/>
        <TVSearchResult/>
        <Footer />
    </>
  )
}

export default SearchPage;