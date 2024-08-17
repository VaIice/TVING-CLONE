import { GetMovieResults, getMovieTopRated } from "../../API/axios";
import { useQuery } from "@tanstack/react-query";
import SkeletonCarousel from "../Skeleton/SkeletonSubCarousel";
import SubCarousel from "../Carousel/SubCarousel";

function MoviePopular() {

  const { data, isLoading, isFetching } = useQuery<GetMovieResults>({
    queryKey: ['Movie'],
    queryFn: () => getMovieTopRated(),
    staleTime: 5 * 60 * 1000
  });

  const title = "가장 인기 많은 영화";
  
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

export default MoviePopular;