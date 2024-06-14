import { useDispatch, useSelector } from 'react-redux';
import '../../css/searchBar.css'
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../Navbar";
import RecentSearch from "./RecentSearch";
import { IsSearchingFalse, IsSearchingTrue, RootState, addRecentSearchList, changeSearchTextInput, falseIsClickedSearchIconState, trueIsClickedSearchIconState } from "../../store/store";
import { GetMovieResults, getMovieSearch } from '../../API/axios';
import { useQuery } from '@tanstack/react-query';
import { KeyboardEvent, KeyboardEventHandler, useEffect } from 'react';

function SearchBar() {
  const searchTextInput = useSelector((state: RootState) => state.searchTextInput);
  const isSearching = useSelector((state: RootState) => state.isSearching);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.slice(0, 9) === "/search/") {
      dispatch(changeSearchTextInput(location.pathname.replace('/search/', '')));
    }
  }, [])

  const handleSearchTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(changeSearchTextInput(e.target.value));
    }
  
  const onClickSearchBarIcon = () => {
    navigate(`/search/${searchTextInput}`);
    dispatch(addRecentSearchList(searchTextInput));
    dispatch(falseIsClickedSearchIconState());
  }

  function isClickEnter(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchTextInput.length !== 0) {
        onClickSearchBarIcon();
      } 
    }
  }

  return (
      <div className="searchBox">
        <input type="text" id="searchInput" placeholder='제목을 입력해보세요.' onChange={handleSearchTextInput} value={searchTextInput} autoComplete='off' onKeyDown={isClickEnter}/>
        <i className="fa-solid fa-magnifying-glass searchBarIcon" onClick={onClickSearchBarIcon}></i>
      </div>
  );
}

export default SearchBar;