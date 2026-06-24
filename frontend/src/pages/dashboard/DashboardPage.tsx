import { useEffect } from 'react';
import axios from 'axios';

export default function DashboardPage() {

  useEffect(() => {

    const getMe = async () => {

      const token =
        localStorage.getItem('token');

      console.log(token);

      const response =
        await axios.get(
          'http://localhost:3000/auth/me',
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          },
        );

      console.log(
        response.data,
      );
    };

    getMe();

  }, []);

  return (
    <div>
      Dashboard
    </div>
  );
}