import "../../css/carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { MouseEventHandler, useState } from "react";

function SkeletonMainCarousel() {
  const [movieUpcomingCurrentIndex, setMovieUpcomingCurrentIndex] = useState<number>(0);
  const numberOfSkeletons = 6;

  function renderArrow(clickHandler: MouseEventHandler<HTMLDivElement>, hasArrow: boolean, direction: string) {
    if (direction === "prev" && movieUpcomingCurrentIndex <= 0)
      return <div className="noneArrowPrevBox" />
    else if (direction === "next" && movieUpcomingCurrentIndex >= 5)
      return <div className="noneArrowNextBox" />

    return (
      hasArrow && (
        <div onClick={(e) => {
          clickHandler(e);
          direction === "prev" && movieUpcomingCurrentIndex === 0 ?
            setMovieUpcomingCurrentIndex(0) :
            setMovieUpcomingCurrentIndex(prev => prev + (direction === "prev" ? -1 : 1));
        }} className={`${direction === "prev" ? "arrowPrevBox" : "arrowNextBox"}`}>
          <i className={`fa-solid fa-chevron-${direction === "prev" ? "left" : "right"} arrow`}></i>
        </div>
      )
    )
 }
 
  return (
      <Carousel
          centerSlidePercentage={90}
          centerMode={true}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          renderArrowPrev={(clickHandler, hasPrev) => renderArrow(clickHandler, hasPrev, 'prev')}
          renderArrowNext={(clickHandler, hasNext) => renderArrow(clickHandler, hasNext, 'next')}
        >
          {Array.from({ length: numberOfSkeletons }).map((e, index) => (
            <div key={index} className={`${movieUpcomingCurrentIndex === index ? "activePosterBox" : "inactivePosterBox"}`}>
                <Skeleton className="PosterBox-image"/>
            </div>
          ))}
      </Carousel>
    )
}

export default SkeletonMainCarousel;
