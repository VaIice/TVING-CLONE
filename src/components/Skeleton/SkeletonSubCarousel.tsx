import "../../css/carousel.css"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonSubCarousel({ title }: { title: string }) {
   const responsive = {
      all: {
        breakpoint: { max: 4000, min: 0 },
        items:5.5,
        slidesToSlide: 4.85
      }
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
          {Array.from({ length: 20 }).map((e, index) => (
            <div key={index} className="slider" style={{ position: 'relative', aspectRatio: '16/9' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <Skeleton height="100%" />
              </div>
            </div>
          ))}
      </Carousel>
      </div>
    )
}

export default SkeletonSubCarousel;
