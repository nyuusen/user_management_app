import { useState, useCallback } from 'react';
import axios from 'axios';

import { User } from 'types/api/user';
import { useMessage } from './useMessage';

export const useAllUsers = () => {
  const { showMessage } = useMessage();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const getAllUsers = useCallback(() => {
    setLoading(true);
    axios
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .then((res) => setAllUsers(res.data))
      .catch(() =>
        showMessage({ title: 'ユーザー取得に失敗しました', status: 'error' })
      )
      .finally(() => setLoading(false));
  }, []);

  return { getAllUsers, allUsers, loading };
};
