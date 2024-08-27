import { GetMovieResults, getMovieTrend } from "../../API/axios";
import { useQuery } from "@tanstack/react-query";
import SkeletonCarousel from "../Skeleton/SkeletonSubCarousel";
import SubCarousel from "../Carousel/SubCarousel";

function MovieTrend() {
  
  const { data, isLoading, error } = useQuery<GetMovieResults>({
    queryKey: ['MovieTrend'],
    queryFn: () => getMovieTrend(),
    staleTime: 5 * 60 * 1000,
  });

  const title = "급상승 영화";
  
  if (!isLoading && data?.results) {
    return (
      <SubCarousel data={data} title={title} mediaType="M"/>
    );
  }

  else {
    return (
      <SkeletonCarousel title={title}/>
    )
  }
}

export default MovieTrend;