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
import SearchCarousel from '../Carousel/SearchCarousel';
import SkeletonSubCarousel from '../Skeleton/SkeletonSubCarousel';

function MovieSearchResult() {

  const recentSearchList = useSelector((state: RootState) => state.recentSearchList);
  const location = useLocation();
  const searchText = location.pathname.replace('/search/', '') || '';

  const { data, isLoading } = useQuery<GetMovieResults>({
    queryKey: ['MovieSearch', recentSearchList],
      queryFn: async () => {
     return getMovieSearch(searchText);
  }
  });

  const title = "영화";

  if (!isLoading && data?.results) {
    return (
      <SearchCarousel data={data} title={title} mediaType="M"/>
    );
  }

  else {
    return (
      <SkeletonSubCarousel title={title}/>
    )
  }
}

export default MovieSearchResult;