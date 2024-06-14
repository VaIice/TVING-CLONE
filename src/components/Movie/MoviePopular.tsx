import { MouseEventHandler, useEffect } from "react";
import { GetMovieResults, getMoviePopular, getMovieTrend } from "../../API/axios";
import { useQuery } from "@tanstack/react-query";
import "../../css/carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useNavigate } from "react-router-dom";
import "../../css/carousel.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
function MoviePopular() {

    const navigator = useNavigate();

  const { data, isLoading, isFetching } = useQuery<GetMovieResults>({
    queryKey: ['MoviePopular'],
    queryFn: () => getMoviePopular(),
    staleTime: 5 * 60 * 1000
  });
 
    const MAX_PAGES = 4;
    const PAGE_IMAGES = 5;
  
  const responsive = {
      all: {
        breakpoint: { max: 4000, min: 0 },
        items:5.5,
        slidesToSlide: 4.85
      }
  };

  function onClickDetail(id: number) {
    console.log(123);
    navigator(`/detail/M${id}`);
  }
  
return (
   <>
    {!isLoading && data?.results ? (
            <div className="carouselBox">
        <div className="carouselTitle">실시간 인기 영화</div>
      <Carousel
          responsive={responsive}
          autoPlay={false}
          draggable={false}
          showDots={true}
          customLeftArrow={<div className="carouselArrowPrevBox"><i className={`fa-solid fa-chevron-left carouselArrow`}></i></div>}
          customRightArrow={<div className="carouselArrowNextBox"><i className={`fa-solid fa-chevron-right carouselArrow`}></i></div>}
          infinite={false}
          dotListClass={`custom-dot-list-style`}
        >
         {data?.results?.slice(0, MAX_PAGES*PAGE_IMAGES + 1).map((e, index) => (
           <div key={index} className="slider" onClick={() => onClickDetail(e.id)}>
             <img className={data?.results.length > PAGE_IMAGES? "" : "insufficientSlidesImage"} src={`https://image.tmdb.org/t/p/original/${e.backdrop_path}`} alt="poster" />
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

export default MoviePopular;