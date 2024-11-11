import { MouseEventHandler, useEffect, useState } from 'react';
import '../../css/recentSearch.css'
import { RootState, addRecentSearchList, changeSearchTextInput, falseIsClickedSearchIconState, removeRecentSearchList, resetRecentSearchList } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetMovieResults, GetTVResults, getMovieSearch, getTVSearch } from '../../API/axios';
import { useQuery } from '@tanstack/react-query';
import "../../css/carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useNavigate } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Skeleton from 'react-loading-skeleton';

function RecentSearch() {
  const recentSearchList = useSelector((state: RootState) => state.recentSearchList);
  const searchTextInput = useSelector((state: RootState) => state.searchTextInput);
  const dispatch = useDispatch();
 const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTextInput);

 useEffect(() => {
   const timer = setTimeout(() => {
     setDebouncedSearchTerm(searchTextInput);
   }, 500);

   return () => {
     clearTimeout(timer);
   };
 }, [searchTextInput]);
  
  const { data: dataMovie, isLoading: isLoadingMovie } = useQuery<GetMovieResults>({
    queryKey: ['MovieSearch', debouncedSearchTerm],
    queryFn: () => getMovieSearch(debouncedSearchTerm)
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
  
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);

  useEffect(() => {
    if (dataMovie?.results) {
      const totalImagesCount = dataMovie.results.length;
      setLoadedImages(new Array(totalImagesCount).fill(false));
    }
  }, [dataMovie]);
  
  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => {
      const newLoadedImages = [...prev];
      newLoadedImages[index] = false;
      return newLoadedImages;
    });
  };
  
return (
  <div className="recentSearchBox">
    {searchTextInput.length > 0 ? (
      !isLoadingMovie && dataMovie?.results && dataMovie.results.length > 0 ? (
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
            ?.filter((e) => e.backdrop_path)
            .slice(0, 5)
            .map((e, index) => (
              <>
                <div key={index} className="slider" onClick={() => onClickDetail(e.id)}>                
                  {
                    loadedImages[index] && <div style={{ position: 'absolute', top: "-5px", left: "-4vw", width: '100%', height: '9vw' }}>
                      <Skeleton height="100%" />
                    </div>
                  }
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${e.backdrop_path}`}
                    alt="poster"
                    style={{marginLeft: "-4vw"}}
                    onLoad={() => handleImageLoad(index)
                  }
                />
                <div className={dataMovie?.results?.length >= 5 ? "recentSearchTitleImageFull" : "recentSearchTitle"} style={{marginLeft: "-4vw"}}>
                  {highlightText(e.title, searchTextInput)}
                </div>
                </div>
              </>
            ))}
        </Carousel>
      ) : (
        null
      )
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