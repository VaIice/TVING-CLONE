import '../css/navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import '../css/searchBar.css'
import { trueIsClickedSearchIconState, falseIsClickedSearchIconState, RootState, changeSearchTextInput, trueIsSearchResultPage, falseIsSearchResultPage } from "../store/store";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const dispatch = useDispatch();
  const isClickedSearchIcon = useSelector((state: RootState) => state.isClickedSearchIcon);
  const isSearchResultPage = useSelector((state: RootState) => state.isSearchResultPage);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  useEffect(() => {
    if (pathname.slice(1, 7) === "search") {
      dispatch(trueIsSearchResultPage());
    }
    else {
      dispatch(falseIsSearchResultPage());
    }
  }, [pathname]);

  useEffect(() => {
    const navbar: HTMLElement | null = document.querySelector('.navbar');
    if (navbar) {
      navbar.style.backgroundColor = isClickedSearchIcon ? '#1a1919' : 'rgba(0, 0, 0, 0.8)';
    }
  }, [isClickedSearchIcon]);

  const onClickProfile = () => {
    window.location.href = 'https://github.com/VaIice';
  }

  const onClickSearchIcon = () => {
    dispatch(trueIsClickedSearchIconState());
  }

  const onClickSearchDeleteIcon = () => {
    dispatch(falseIsClickedSearchIconState());
    dispatch(changeSearchTextInput(""));
    localStorage.removeItem('searchTextInput');
  }


  const onClickLogo = () => {
    navigate('/');
    dispatch(changeSearchTextInput(""));
    localStorage.removeItem('searchTextInput');
    dispatch(falseIsClickedSearchIconState());
  }

  const onClickMovie = () => {
    navigate('/movie');
    dispatch(changeSearchTextInput(""));
    dispatch(falseIsClickedSearchIconState());
    localStorage.removeItem('searchTextInput');
  }  

  const onClickSeries = () => {
    navigate('/series');
    dispatch(changeSearchTextInput(""));
    dispatch(falseIsClickedSearchIconState());
    localStorage.removeItem('searchTextInput');
  }  
  
  return (
   <>
      <div className="navbar">
        <button className="logo" onClick={onClickLogo}>TMDB</button>
        <li className="navbarList" onClick={onClickSeries}>시리즈</li>
          <li className="navbarList" onClick={onClickMovie}>영화</li>
        {
          isClickedSearchIcon ?
            <i className="fa-solid fa-xmark xIcon" onClick={onClickSearchDeleteIcon}></i> :
            <i className={`fa-solid fa-magnifying-glass searchIcon ${isSearchResultPage? "noneVisibility" : ""}`} onClick={onClickSearchIcon}></i>
        }
          <i className="fa-solid fa-user profileIcon" onClick={onClickProfile}></i>
      </div>
      <div className="navbarGap"/>
    </>
 )
}

export default Navbar;