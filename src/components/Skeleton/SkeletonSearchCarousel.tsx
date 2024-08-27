import "../../css/carousel.css"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonSearchCarousel() {
   const responsive = {
      all: {
        breakpoint: { max: 4000, min: 0 },
        items:5.5,
        slidesToSlide: 4.85
      }
 };

  return (
      <div className="carouselBox">
        <Carousel responsive={responsive}>
          {Array.from({ length: 5 }).map((e, index) => (
            <div key={index} className="slider">
              <Skeleton className="slider-image" />
              <Skeleton className="recentSearchTitleImageFull"/>
            </div>
          ))}
        </Carousel>
      </div>
    )
}

export default SkeletonSearchCarousel;
