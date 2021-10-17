import { useState, useCallback } from 'react';

import { User } from './../types/api/user';

type Props = {
  id: number;
  allUsers: User[];
  onOpen: () => void;
};

export const useSelectUser = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const onSelectUser = useCallback((props: Props) => {
    const { id, allUsers, onOpen } = props;
    const targetUser = allUsers.find((user) => user.id === id);
    setSelectedUser(targetUser!);
    onOpen();
  }, []);

  return { selectedUser, onSelectUser };
};
