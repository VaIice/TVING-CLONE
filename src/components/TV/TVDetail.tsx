import { useQuery } from "@tanstack/react-query";
import { GetTVDetail, getTVDetail } from "../../API/axios";
import '../../css/detail.css'
import { useLocation } from 'react-router-dom';
import SkeletonDetail from "../Skeleton/SkeletonDetail";

function TVDetail() {
  const pathname = useLocation().pathname;
  type resultType = GetTVDetail;
  const id: number = parseInt(pathname.replace("/detail/S", ""));
  const queryKey = ['TVDetail', id];
  const queryFn = getTVDetail(id);
  const { data, isLoading } = useQuery<resultType>({
    queryKey: queryKey,
    queryFn: () => queryFn
  });


  function getTitle(data: GetTVDetail): string {
    if (data && 'name' in data) {
      return data.name;
    }
    return '';
  }

  function getReleaseDate(data: GetTVDetail): string {
    if (data && 'first_air_date' in data) {
      return data.first_air_date;
    }
    return '';
  }

  function getRuntime(data: GetTVDetail): number | string {
    if (data && 'number_of_seasons' in data) {
      return '시즌 ' + data.number_of_seasons + '개';
    }
    return 0;
  }

  if (isLoading) {
    return (
      <SkeletonDetail />
    )
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
          <img className="detailPoster" alt="poster"
            srcSet={`
              https://image.tmdb.org/t/p/w342/${data?.poster_path} 342w,
              https://image.tmdb.org/t/p/w500/${data?.poster_path} 500w,
              https://image.tmdb.org/t/p/w780/${data?.poster_path} 780w
            `}
            sizes="(max-width: 767px) 342px, 
                  (max-width: 1023px) 500px, 
                  780px"
            src={`https://image.tmdb.org/t/p/w780/${data?.poster_path}`}/>
       </div>
      </>
   </div>
  )
 }
 return null;
}

export default TVDetail;