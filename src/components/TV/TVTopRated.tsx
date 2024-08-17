import { GetTVResults, getTVTopRated } from "../../API/axios";
import { useQuery } from "@tanstack/react-query";
import SkeletonCarousel from "../Skeleton/SkeletonSubCarousel";
import SubCarousel from "../Carousel/SubCarousel";

function TVTopRated() {
  const { data, isLoading } = useQuery<GetTVResults>({
    queryKey: ['TVTopRated'],
    queryFn: () => getTVTopRated(),
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

export default TVTopRated;