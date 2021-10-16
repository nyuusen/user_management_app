import { useHistory } from 'react-router-dom';
import { useCallback, useState } from 'react';
import axios from 'axios';

import { User } from './../types/api/user';

export const useAuth = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (id: string) => {
      setLoading(true);
      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            history.push('/home');
          } else {
            alert('ユーザーが見つかりません');
          }
        })
        .catch(() => alert('ログインできません'))
        .finally(() => setLoading(false));
    },
    [history]
  );

  return { loading, login };
};
