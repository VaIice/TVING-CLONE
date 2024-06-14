import { GetTVResults, getTVTrend } from "../../API/axios";
import "../../css/carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useNavigate } from "react-router-dom";
import "../../css/carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { MouseEventHandler, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "../../css/carousel.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
function TVTrend() {
  const { data, isLoading, isFetching } = useQuery<GetTVResults>({
    queryKey: ['TVTrend'],
    queryFn: () => getTVTrend(),
    staleTime: 5 * 60 * 1000,
  });

    const [movieTrendCurrentPage, setMovieTrendCurrentPage] = useState<number>(0);

    const MAX_PAGES = 4;
    const PAGE_IMAGES = 5;
  const navigator = useNavigate();

  useEffect(() => {
    console.log(data);
  }, [data])
 
 function renderArrow(clickHandler: MouseEventHandler<HTMLDivElement>, hasArrow: boolean, direction: string) {
   return (
      hasArrow && (
        <div onClick={clickHandler} className={`${direction === "prev" ? "arrowPrevBox" : "arrowNextBox"}`}>
          <i className={`fa-solid fa-chevron-${direction === "prev" ? "left" : "right"} arrow`}></i>
        </div>
    )
   )
  }
  
  function onClickDetail(id: number) {
    console.log(123);
    navigator(`/detail/S${id}`);
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
        <div className="carouselTitle">급상승 시리즈</div>
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

export default TVTrend;