import { useDispatch, useSelector } from 'react-redux';
import '../../css/searchBar.css'
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../Layout/Header";
import RecentSearch from "../Search/RecentSearch";
import { RootState, changeSearchTextInput } from "../../store/store";
import { GetMovieResults, GetTVResults, getMovieSearch, getTVSearch } from '../../API/axios';
import "../../css/carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../css/carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { MouseEventHandler, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "../../css/carousel.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function MovieSearchResult() {

  const recentSearchList = useSelector((state: RootState) => state.recentSearchList);
  const location = useLocation();
  const searchText = location.pathname.replace('/search/', '') || ''; // 현재 경로에서 '/search/' 부분 제거

  const { data: dataMovie, isLoading: isLoadingMovie } = useQuery<GetMovieResults>({
    queryKey: ['MovieSearch', recentSearchList],
      queryFn: async () => {
     return getMovieSearch(searchText);
  }
  });

    const MAX_PAGES = 4;
    const PAGE_IMAGES = 5;
  const navigator = useNavigate();
  
    const dispatch = useDispatch();

  function onClickDetail(media: string, id: number) {
    console.log(123);
    navigator(`/detail/${media}${id}`);
    dispatch(changeSearchTextInput(""));
  }  

    const responsive = {
      all: {
        breakpoint: { max: 4000, min: 0 },
        items: 5.5,
        slidesToSlide: 4.85
      }
  };

 return (
<>    {!isLoadingMovie && dataMovie?.results ? (
      <div className="carouselBox">
        <div className="carouselTitle">영화</div>
      <Carousel
        responsive={responsive}
        autoPlay={false}
        draggable={false}
        showDots={true}
        customLeftArrow={<div className="carouselArrowPrevBox"><i className={`fa-solid fa-chevron-left carouselArrow`}></i></div>}
        customRightArrow={<div className="carouselArrowNextBox"><i className={`fa-solid fa-chevron-right carouselArrow`}></i></div>}
        infinite={false}
        dotListClass="custom-dot-list-style" 
        >
         {dataMovie?.results?.slice(0, MAX_PAGES*PAGE_IMAGES + 1).map((e, index) => (

           <div key={index} className="slider" onClick={() => onClickDetail("M", e.id)}>
             <img  src={`https://image.tmdb.org/t/p/w300/${e.backdrop_path}`} alt="poster" />
            </div>
          ))}
        </Carousel>
        </div>
      ) : (
        null
      )}
     </>
 )
}

export default MovieSearchResult;