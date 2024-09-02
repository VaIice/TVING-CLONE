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

  const { data, isLoading, error } = useQuery<GetTrailer>({
    queryKey: ['TVTrailer', id],
    queryFn: () => {
      if (id === undefined || isNaN(id)) {
        return Promise.reject(new Error("ID is invalid"));
      }
      return getTVTrailer(id);
    },
    enabled: id !== undefined
  });
  
  useEffect(() => {
   console.log(id);
  }, [id]);

  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  useEffect(() => {
    if (data?.results && data.results.length > 0) {
     const videoKey = data.results[0].key;
     setTrailerUrl(`https://www.youtube.com/watch?v=${videoKey}`);
   }
  }, [data]);

  const [loaded, setLoaded] = useState(true);

  const handleReady = () => {
    setLoaded(false);
  }

 return (
   <>
     <div className="trailerBox">\
       {loaded && <div style={{ position: 'absolute', top: '12.5%', left: '5%', width: '90%', height: '80vh' }}><Skeleton width={`100%`} height={`100%`} /></div>}
              <ReactPlayer
                url={trailerUrl ? trailerUrl : undefined}
                volume={0.3}
                // control={false}
                playing={true}
                width="100%"
                height="100%"
                onReady={handleReady}
              ></ReactPlayer>
      </div>
    </>
  );
};

export default TVTrailer;