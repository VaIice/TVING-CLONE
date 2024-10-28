import { useLocation } from 'react-router-dom';
import MovieTrailer from "../components/Movie/MovieTrailer";
import TVTrailer from "../components/TV/TVTrailer";
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import SearchModal from './SearchModal';

function TrailerPage() {
  const { pathname } = useLocation();
  const isClickedSearchIcon= useSelector( (state :RootState) => state.isClickedSearchIcon);

return (
  <>
    
        {
            isClickedSearchIcon ? (
              <SearchModal/>
            ) : (
              <>
                {pathname[16] === 'M' ? <MovieTrailer /> : <TVTrailer />}
              </>
            )
        }    
      </>
)
}

export default TrailerPage;
