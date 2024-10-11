import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/userSlice';
import { fetchMe } from '@/lib/api';

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    } else {
      const fetch = async () => {
        try {
          const response = await fetchMe();
          dispatch(setUser(response.user));
          router.push('/dashboard')
        }catch(error) {
          console.error("Error fetching user profile:", error);
          router.push('/auth/login');
        }
      }
      fetch();
    }
  }, []);
};