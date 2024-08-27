import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';
import { GetMovieResults, GetTVResults } from '../../API/axios';
import "../../css/searchCarousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Skeleton from 'react-loading-skeleton';

function SearchCarousel({ data, title, mediaType }: { data: GetMovieResults | GetTVResults, title: string, mediaType: "M" | "S"}) {

  const responsive = {
    all: {
      breakpoint: { max: 4000, min: 0 },
      items: 5.5,
      slidesToSlide: 4.85
    }
  };

  const navigator = useNavigate();

  function onClickDetail(id: number) {
    if (mediaType === "M") {
      navigator(`/detail/M${id}`);
    } else {
      navigator(`/detail/S${id}`);
    }
  }

 const totalImages = 5;

  const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(totalImages).fill(false));

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => {
      const newLoadedImages = [...prev];
      newLoadedImages[index] = true;
      return newLoadedImages;
    });
  };

  return (
    <div className="carouselBox">
      <div className="carouselTitle">{title}</div>
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
        {data.results.slice(0, totalImages).map((e, index) => (
          <div key={index} className="slider" onClick={() => onClickDetail(e.id)} style={{ position: 'relative', aspectRatio: '16/9' }}>
            {!loadedImages[index] && (
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <Skeleton height="100%" />
              </div>
            )}
            <img
              loading="lazy"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: loadedImages[index] ? 1 : 0
              }}
              onLoad={() => handleImageLoad(index)}
              srcSet={`
                https://image.tmdb.org/t/p/w300/${e.backdrop_path} 300w,
                https://image.tmdb.org/t/p/w780/${e.backdrop_path} 780w,
                https://image.tmdb.org/t/p/w1280/${e.backdrop_path} 1280w
              `}
              sizes="(max-width: 767px) 300px, 
                     (max-width: 1023px) 780px, 
                     1280px"
              src={`https://image.tmdb.org/t/p/w780/${e.backdrop_path}`}
              alt="poster"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default SearchCarousel;