import { MouseEventHandler, useEffect, useState } from 'react';
import '../../css/recentSearch.css'
import { RootState, addRecentSearchList, changeSearchTextInput, falseIsClickedSearchIconState, removeRecentSearchList, resetRecentSearchList } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetMovieResults, GetTVResults, getMovieSearch, getTVSearch } from '../../API/axios';
import { useQuery } from '@tanstack/react-query';
import "../../css/carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useNavigate } from "react-router-dom";
import "../../css/carousel.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function RecentSearch() {
  const recentSearchList = useSelector((state: RootState) => state.recentSearchList);
  const searchTextInput = useSelector((state: RootState) => state.searchTextInput);
  const dispatch = useDispatch();

  const { data: dataMovie, isLoading: isLoadingMovie } = useQuery<GetMovieResults>({
    queryKey: ['MovieSearch', searchTextInput],
    queryFn: () => getMovieSearch(searchTextInput)
  });
  
  function onClickSearchDataXIcon(index: number) {
    dispatch(removeRecentSearchList(index));
  }

  function onClickSearchDeleteAllDataXIcon() {
    dispatch(resetRecentSearchList());
  }

    const navigate = useNavigate();
  
  function onClickRecentSearchList(searchData: string) {
    dispatch(changeSearchTextInput(searchData));
    dispatch(addRecentSearchList(searchData));
    dispatch(falseIsClickedSearchIconState());
    navigate(`/search/${searchData}`);
  }

  const responsive = {
      all: {
        breakpoint: { max: 4000, min: 0 },
        items:5.5,
        slidesToSlide: 4.
      }
  };
      const navigator = useNavigate();

  function onClickDetail(id: number) {
    navigator(`/detail/M${id}`);
    dispatch(falseIsClickedSearchIconState());
    dispatch(addRecentSearchList(searchTextInput));
    dispatch(changeSearchTextInput(""));
  }

  const highlightText = (text: string, query: string) => {
  if (query !== '' && text.includes(query)) {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span className="highlight" key={index}>{part}</span>
          ) : (
              <span>{part}</span>
          )
        )}
      </>
    );
  }

  return text;
  };
  
  return (
    <div className="recentSearchBox">
      {searchTextInput.length > 0 ? (
        !isLoadingMovie && dataMovie?.results && dataMovie.results.length > 0? (
          <Carousel
            responsive={responsive}
            autoPlay={false}
            draggable={false}
            showDots={true}
            customLeftArrow={<div className="carouselArrowPrevBox"><i className={`fa-solid fa-chevron-left carouselArrow`}></i></div>}
            customRightArrow={<div className="carouselArrowNextBox"><i className={`fa-solid fa-chevron-right carouselArrow`}></i></div>}
            infinite={false}
          >
          {dataMovie?.results
            ?.filter((e) => e.backdrop_path)  // backdrop_path가 null이 아닌 항목만 포함
            .slice(0, 5)  // 최대 5개의 항목만 포함
            .map((e, index) => (
              <div key={index} className="slider" onClick={() => onClickDetail(e.id)}>
                <img
                  className={dataMovie?.results?.length >= 5 ? "recentSearchImageFull" : "recentSearchImage"}
                  src={`https://image.tmdb.org/t/p/original/${e.backdrop_path}`}
                  alt="poster"
                />
                                                  <div className={dataMovie?.results?.length >= 5 ? "recentSearchTitleImageFull" : "recentSearchTitle"}>
                    {highlightText(e.title, searchTextInput)}
                  </div>
                  </div>
            ))}
            </Carousel>
        ) : null
      ) : (
        <>
          <span className="searchListTitle">최근 검색어</span>
          {recentSearchList.length !== 0 ? (
            <span className="searchDeleteAllData" onClick={onClickSearchDeleteAllDataXIcon}>
              모두 지우기<i className="fa-solid fa-xmark searchDeleteAllDataXIcon"></i>
            </span>
          ) : null}
          <ul>
            {recentSearchList.length > 0 ? (
              <div>
                {recentSearchList.map((searchData: string, index: number) => (
                  <div className="searchList" key={index}>
                    <span onClick={() => onClickRecentSearchList(searchData)} className="searchData">{searchData}</span>
                    <i className="fa-solid fa-xmark searchDataXIcon" onClick={() => onClickSearchDataXIcon(index)} />
                  </div>
                ))}
              </div>
            ) : (
              <li className="searchList">검색 내용이 없습니다.</li>
            )}
          </ul>
        </>
      )}
    </div>
  );
}



export default RecentSearch;