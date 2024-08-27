import { GetMovieResults, getMovieUpcoming } from "../../API/axios";
import { useQuery } from "@tanstack/react-query";
import SkeletonMainCarousel from "../Skeleton/SkeletonMainCarousel";
import MainCarousel from "../Carousel/MainCarousel";

function MovieUpcoming() {
  const { data, isLoading } = useQuery<GetMovieResults>({
    queryKey: ['MovieUpcoming'],
    queryFn: () => getMovieUpcoming(1),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <SkeletonMainCarousel />
    );
  }
  else if (!isLoading && data?.results) {
    return (
      <MainCarousel data={data} />
    );
  }
  return null;
}

export default MovieUpcoming;