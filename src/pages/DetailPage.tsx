import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetMovieDetail, GetTVDetail, getMovieDetail, getTVDetail } from "../API/axios";
import '../css/detail.css'
import { useLocation } from 'react-router-dom';
import Footer from "../components/Footer";
import MovieTrend from "../components/Movie/MovieTrend";
import TVTrend from "../components/TV/TVTrend";
import SearchModal from "./SearchModal";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function DetailPage() {

  const prevPathnameRef = useRef("");
  const pathname = useLocation().pathname;
  const mediaChar: string = pathname[8];
  const media: 'M' | 'S' = (mediaChar === 'M' || mediaChar === 'S') ? mediaChar : 'S';
  type resultType = typeof media extends 'M' ? GetMovieDetail : GetTVDetail;
  const id: number = media === 'M' ? parseInt(pathname.replace("/detail/M", "")) : parseInt(pathname.replace("/detail/S", ""));
  const queryKey = media === 'M' ? ['MovieDetail', id] : ['TVDetail', id];
  const queryFn = media === 'M' ? getMovieDetail(id) : getTVDetail(id);
  const { data, isLoading } = useQuery<resultType>({
    queryKey: queryKey,
    queryFn: () => queryFn
  });

  const isClickedSearchIcon= useSelector( (state :RootState) => state.isClickedSearchIcon);

  if (prevPathnameRef.current !== pathname) {
    prevPathnameRef.current = pathname;
  }
  function getTitle(data: GetMovieDetail | GetTVDetail | undefined): string {
    if (data && media === 'M' && 'title' in data) {
      return data.title;
    } else if (data && media === 'S' && 'name' in data) {
      return data.name;
    }
    return '';
  }

  function getReleaseDate(data: GetMovieDetail | GetTVDetail | undefined): string {
    if (data && media === 'M' && 'release_date' in data) {
      return data.release_date;
    } else if (data && media === 'S' && 'first_air_date' in data) {
      return data.first_air_date;
    }
    return '';
  }

  function getRuntime(data: GetMovieDetail | GetTVDetail | undefined): number | string {
    if (data && media === 'M' && 'runtime' in data) {
      return data.runtime;
    } else if (data && media === 'S' && 'number_of_seasons' in data) {
      return '시즌 ' + data.number_of_seasons + '개';
    }
    return 0;
  }
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 이동 후 스크롤 맨 위로 올리기
  }, [pathname]); // pathname이 변경될 때마다 실행

  return null; // ScrollToTop은 실제로 UI에 나타나지 않음
}

  return (
    <>      <ScrollToTop />

      {
        isClickedSearchIcon ? (
        <SearchModal/>
        )
          : (
            <>
    <div className="detailBox">
      {
        !isLoading && prevPathnameRef.current === pathname && (
            <>
             <div>
            <div className="detailTitle">{getTitle(data)}</div>
            <div className="detailAdult">전체{data?.adult}</div>
                        <div className="detailElement">{getReleaseDate(data)}</div>
                        {
                          data?.genres[0]?.name ? 
                                        <div className="detailElement">{data?.genres[0]?.name}</div>  : <></>
                        }
            <div className="detailElement">{getRuntime(data)}</div>
            <div className="detailOverview">{data?.overview}</div>
              </div> 
              <div className="detailRightBox">
                <img className="detailPoster" src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`} />
              </div>
            </>
        )
        
      }
      </div>
      <MovieTrend />
      <TVTrend/>
              <Footer />
              </>
    )
      }
    </>
  )
}

export default DetailPage;
