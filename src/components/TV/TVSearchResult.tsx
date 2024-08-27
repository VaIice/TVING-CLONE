import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from "../../store/store";
import { GetTVResults, getTVSearch } from '../../API/axios';
import { useQuery } from "@tanstack/react-query";
import SubCarousel from '../Carousel/SubCarousel';
import SkeletonSubCarousel from '../Skeleton/SkeletonSubCarousel';

function TVSearchResult() {

  const recentSearchList = useSelector((state: RootState) => state.recentSearchList);
  const location = useLocation();
  const searchText = location.pathname.replace('/search/', '') || ''; // 현재 경로에서 '/search/' 부분 제거

  const { data, isLoading } = useQuery<GetTVResults>({
    queryKey: ['TVSearch', recentSearchList],
    queryFn: async () => {
     return getTVSearch(searchText);
  }
  });

  const title = "시리즈";

  if (!isLoading && data?.results) {
    return (
      <SubCarousel data={data} title={title} mediaType="M"/>
    );
  }

  else {
    return (
      <SkeletonSubCarousel title={title}/>
    )
  }
}

export default TVSearchResult;