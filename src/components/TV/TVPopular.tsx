import { GetTVResults, getTVPopular } from "../../API/axios";
import { useQuery } from "@tanstack/react-query";
import SkeletonCarousel from "../Skeleton/SkeletonSubCarousel";
import SubCarousel from "../Carousel/SubCarousel";

function TVPopular() {
  const { data, isLoading } = useQuery<GetTVResults>({
    queryKey: ['TVPopular'],
    queryFn: () => getTVPopular(),
    staleTime: 5 * 60 * 1000, // 5분 동안 데이터를 신선하게 유지
  });

  const title = "실시간 인기 시리즈";
  
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

export default TVPopular;