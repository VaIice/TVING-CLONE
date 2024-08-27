import { useQuery } from "@tanstack/react-query";
import { GetMovieDetail, getMovieDetail } from "../../API/axios";
import '../../css/detail.css'
import { useLocation } from 'react-router-dom';
import SkeletonDetail from "../Skeleton/SkeletonDetail";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";

function MovieDetail() {
  const pathname = useLocation().pathname;
 type resultType = GetMovieDetail;
  const id: number = parseInt(pathname.replace("/detail/M", ""));
  const queryKey = ['MovieDetail', id] ;
  const queryFn = getMovieDetail(id);
  const { data, isLoading } = useQuery<resultType>({
    queryKey: queryKey,
    queryFn: () => queryFn
  });


  function getTitle(data: GetMovieDetail): string {
    if (data && 'title' in data) {
      return data.title;
    }
    return '';
  }

  function getReleaseDate(data: GetMovieDetail): string {
    if (data && 'release_date' in data) {
      return data.release_date;
    }
    return '';
  }

  function getRuntime(data: GetMovieDetail): number | string {
    if (data && 'runtime' in data) {
      return data.runtime;
    }
    return 0;
  }

  const [loadImage, setLoadImage] = useState(false);

  function handleImage() {
    setLoadImage(true);
  }

 if (!isLoading && data) {
  return (
   <div className="detailBox">
      <>
       <div className="detailLeftBox">
        <div className="detailTitle">{getTitle(data)}</div>
        <div className="detailAdult">전체{data?.adult}</div>
        <div className="detailElement">{getReleaseDate(data)}</div>
        {
         data?.genres[0]?.name ?
          <div className="detailElement">{data?.genres[0]?.name}</div> : <></>
        }
        <div className="detailElement">{getRuntime(data)}</div>
        <div className="detailOverview">{data?.overview}</div>
       </div>
        <div className="detailRightBox">
          {!loadImage &&
              <div style={{ position: 'absolute', top: "7%", right: "6%", width: '17.8%', height: '79%' }}>
                <Skeleton height="100%" />
              </div>
          }
          <img className="detailPoster" alt="poster"
            srcSet={`
              https://image.tmdb.org/t/p/w342/${data?.poster_path} 342w,
              https://image.tmdb.org/t/p/w500/${data?.poster_path} 500w,
              https://image.tmdb.org/t/p/w780/${data?.poster_path} 780w
            `}
            sizes="(max-width: 767px) 342px, 
                  (max-width: 1023px) 500px, 
                  780px"
            src={`https://image.tmdb.org/t/p/w780/${data?.poster_path}`}
              style={{
                opacity: loadImage? 1 : 0
              }}            
            onLoad={handleImage}
          />
       </div>
      </>
   </div>
  )
 }
 else {
    return (
      <SkeletonDetail />
    )
}
}

export default MovieDetail;