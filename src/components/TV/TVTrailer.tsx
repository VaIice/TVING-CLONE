import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Header from "../Layout/Header";
import { useQuery } from "@tanstack/react-query";
import { getTVTrailer, GetTrailer } from "../../API/axios";
import { useLocation, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const TVTrailer = () => {
  const { id: paramsId } = useParams<{ id: string }>();

  const id = paramsId ? parseInt(paramsId.replace("S", ""), 10) : undefined;

  const { data, isError } = useQuery<GetTrailer>({
    queryKey: ['TVTrailer', id],
    queryFn: () => {
      if (id === undefined || isNaN(id)) {
        return Promise.reject(new Error("ID is invalid"));
      }
      return getTVTrailer(id);
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
   <>
     <div className="trailerBox">
       {loaded && <div style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', aspectRatio: '16/9.5' }}><Skeleton width={`100%`} height={`100%`} /></div>}
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
    </>
  );
};

export default TVTrailer;