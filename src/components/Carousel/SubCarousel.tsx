import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';
import { GetMovieResults, GetTVResults } from '../../API/axios';
import "../../css/carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function SubCarousel({ data, title, mediaType }: {data: GetMovieResults | GetTVResults, title: string, mediaType: "M" | "S"}) {
 
 const MAX_PAGES = 5;
 const PAGE_IMAGES = 5;

  const responsive = {
      all: {
        breakpoint: { max: 4000, min: 0 },
        items:5.5,
        slidesToSlide: 4.85
      }
 };

  const navigator = useNavigate();
 
 function onClickDetail(id: number) {
    if (mediaType === "M") {
          navigator(`/detail/M${id}`);
    }
    else {
    navigator(`/detail/S${id}`);
    }
  }

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
          {data.results.slice(0, MAX_PAGES * PAGE_IMAGES + 1).map((e, index) => (
            <div key={index} className="slider" onClick={() => onClickDetail(e.id)}>
             <img loading="lazy" width="auto" height="100%" className={data?.results.length > PAGE_IMAGES ? "subCarouselImage" : "insufficientSlidesImage"} src={`https://image.tmdb.org/t/p/w300/${e.backdrop_path}`} alt="poster" />
            </div>
          ))}
      </Carousel>
    </div>
 )
}

export default SubCarousel;