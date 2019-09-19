import { useApolloClient } from '@apollo/react-hooks';
import { useCallback } from 'react';

export const signIn = (currentUserId: string) => {
  document.cookie = `currentUserId=${currentUserId}`;

  return Promise.resolve();
};

export const useSignOut = () => {
  const client = useApolloClient();

  return useCallback(() => {
    document.cookie = `currentUserId=;expires=${new Date(0)}`;

    // Clear cache
    return client.clearStore();
  }, [client]);
};

export const isSignedIn = () => {
  return /currentUserId=.+(;|$)/.test(document.cookie);
};
