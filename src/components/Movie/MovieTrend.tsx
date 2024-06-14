import { MouseEventHandler, useEffect, useState } from "react";
import { GetMovieResults, getMovieTrend } from "../../API/axios";
import { useQuery } from "@tanstack/react-query";
import "../../css/carousel.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from "react-router-dom";

function MovieTrend() {
  const { data, isLoading } = useQuery<GetMovieResults>({
    queryKey: ['MovieTrend'],
    queryFn: () => getMovieTrend(),
    staleTime: 5 * 60 * 1000,
  });

    const [movieTrendCurrentPage, setMovieTrendCurrentPage] = useState<number>(0);

    const MAX_PAGES = 5;
    const PAGE_IMAGES = 4;

  const navigator = useNavigate();

  function onClickDetail(id: number) {
    navigator(`/detail/M${id}`);
  }

 
  const responsive = {
      all: {
        breakpoint: { max: 4000, min: 0 },
        items:5.5,
        slidesToSlide: 4.85
      }
  };

return (
   <>
    {!isLoading && data?.results ? (
      <div className="carouselBox">
        <div className="carouselTitle">급상승 영화</div>
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
         {data?.results?.slice(0, MAX_PAGES*PAGE_IMAGES + 1).map((e, index) => (
           <div key={index} className="slider" onClick={() => onClickDetail(e.id)}>
             <img className="" src={`https://image.tmdb.org/t/p/original/${e.backdrop_path}`} alt="poster" />
            </div>
          ))}
        </Carousel>
        </div>
      ) : (
        null
      )}
    </>  
);


}

export default MovieTrend;