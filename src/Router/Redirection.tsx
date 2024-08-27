import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Redirection() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지 새로 고침 감지
    const isReload = performance.navigation.type === performance.navigation.TYPE_RELOAD;

    if (isReload) {
      const { pathname } = location;
      // 새로 고침 시 특정 경로를 '/'로 리디렉션
      if (pathname === '/movie' || pathname === '/series' || pathname.startsWith('/search/') || pathname.startsWith('/detail/')) {
        navigate('/');
      }
    }
  }, [location, navigate]);

  return null;
}


export default Redirection;