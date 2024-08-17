import { GetTVResults, getTVTrend } from "../../API/axios";
import { useQuery } from "@tanstack/react-query";
import SkeletonCarousel from "../Skeleton/SkeletonSubCarousel";
import SubCarousel from "../Carousel/SubCarousel";

function TVTrend() {
  const { data, isLoading, isFetching } = useQuery<GetTVResults>({
    queryKey: ['TVTrend'],
    queryFn: () => getTVTrend(),
    staleTime: 5 * 60 * 1000,
  });

  const title = "가장 인기 많은 시리즈";
  
  if (!isLoading && data?.results) {
    return (
      <SubCarousel data={data} title={title} mediaType="S"/>
    );
  }

  else {
    return (
      <SkeletonCarousel title={title}/>
    )
  }
}

export default TVTrend;