import { memo, VFC, useEffect, useCallback } from 'react';
import {
  Wrap,
  WrapItem,
  Center,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { UserCard } from 'components/organisms/user/UserCard';
import { useAllUsers } from 'hooks/useAllUsers';
import { useSelectUser } from 'hooks/useSelectUser';
import { UserDetailModal } from 'components/organisms/user/UserDetailModal';

export const UserManagement: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getAllUsers, allUsers, loading } = useAllUsers();
  const { selectedUser, onSelectUser } = useSelectUser();
  useEffect(() => getAllUsers(), []);

  const onClickUser = useCallback(
    (id: number) => {
      onSelectUser({ id, allUsers, onOpen });
    },
    [allUsers, onSelectUser, onOpen]
  );

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {allUsers.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                id={user.id}
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                fullName={user.name}
                onClick={onClickUser}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <UserDetailModal isOpen={isOpen} onClose={onClose} user={selectedUser} />
    </>
  );
});
