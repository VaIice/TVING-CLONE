import SearchBar from "../components/Search/SearchBar";
import MovieSearchResult from "../components/Movie/MovieSearchResult";
import TVSearchResult from "../components/TV/TVSearchResult";
import Footer from "../components/Layout/Footer";

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