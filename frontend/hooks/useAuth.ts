import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { usePathname } from 'next/navigation';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) setUser(decoded);
        else { setUser(null); Cookies.remove('token'); }
      } catch { setUser(null); Cookies.remove('token'); }
    } else setUser(null);
    setLoading(false);
  }, [pathname]);

  return { user, isAdmin: user?.role === 'admin', isAuthenticated: !!user, loading };
}