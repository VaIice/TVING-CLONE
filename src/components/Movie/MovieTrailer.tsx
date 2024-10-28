import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Header from "../Layout/Header";
import { useQuery } from "@tanstack/react-query";
import { getMovieTrailer, GetTrailer } from "../../API/axios";
import { useLocation, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const MovieTrailer = () => {
  const { id: paramsId } = useParams<{ id: string }>();

  const id = paramsId ? parseInt(paramsId.replace("M", ""), 10) : undefined;

  const { data, isLoading, error } = useQuery<GetTrailer>({
    queryKey: ['MovieTrailer', id],
    queryFn: () => {
      if (id === undefined || isNaN(id)) {
        return Promise.reject(new Error("ID is invalid"));
      }
      return getMovieTrailer(id);
    },
    enabled: id !== undefined
  });
  
  const [trailerUrl, setTrailerUrl] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTrailerUrl(null);
      setLoaded(false);
    }, 5000);
    
    if (data?.results && data.results.length > 0) {
      const videoKey = data.results[0].key;
      setTrailerUrl(`https://www.youtube.com/watch?v=${videoKey}`);
      clearTimeout(timer);   
    }

    return () => clearTimeout(timer);    
  }, [data]);

  const [loaded, setLoaded] = useState(true);

  const handleReady = () => {
    setLoaded(false);
  };

  return (
     <div className="trailerBox">
       {loaded && <div className="skeletonTrailerBox"><Skeleton width={`100%`} height={`100%`} /></div>}
       {trailerUrl ?
         <ReactPlayer
           url={trailerUrl}
           volume={0.3}
           control={false}
           playing={false}
           width="100%"
           height="100%"
           onReady={handleReady}
         ></ReactPlayer> : <div className="instruction">미디어를 재생할 수 없습니다.</div>
       }
    </div>
  );
};

export default MovieTrailer;