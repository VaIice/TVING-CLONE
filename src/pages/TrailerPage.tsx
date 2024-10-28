import { useLocation } from 'react-router-dom';
import MovieTrailer from "../components/Movie/MovieTrailer";
import TVTrailer from "../components/TV/TVTrailer";

function TrailerPage() {
  const { pathname } = useLocation();

return (
      <>
        {pathname[16] === 'M' ? <MovieTrailer /> : <TVTrailer />}
      </>
)
}

export default TrailerPage;
