import { useSelector } from "react-redux";
import RecentSearch from "../components/Search/RecentSearch";
import SearchBar from "../components/Search/SearchBar";
import { RootState } from "../store/store";
import { useEffect } from "react";

function SearchModal() {
  const isSearching = useSelector( (state :RootState) => state.isSearching);
  useEffect(() => {
    document.body.style.backgroundColor = '#1a1919';

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