import { useSelector } from "react-redux";
import RecentSearch from "../components/Search/RecentSearch";
import SearchBar from "../components/Search/SearchBar";
import { RootState } from "../store/store";
import SearchResult from "../components/Movie/MovieSearchResult";
import { useEffect } from "react";

function SearchModal() {
  const isSearching = useSelector( (state :RootState) => state.isSearching);
  useEffect(() => {
    // 마운트 시 gray 배경색 적용
    document.body.style.backgroundColor = '#1a1919';

    // 언마운트 시 black 배경색으로 되돌림
    return () => {
      document.body.style.backgroundColor = 'black';
    };
  }, []);

  
  return (
    <>
        <SearchBar />
        {
          isSearching ?
            <RecentSearch /> : <RecentSearch />
        }
    </>
  )
}

export default SearchModal;