import MaterialButton from '@material-ui/core/Button';
import MaterialTextField from '@material-ui/core/TextField';
import React, { useCallback, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { signIn } from '../../services/auth.service';

const AuthScreen: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const [userId, setUserId] = useState('');

  const onUserIdChange = useCallback(({ target }) => {
    setUserId(target.value);
  }, []);

  const maySignIn = useCallback(() => {
    return !!userId;
  }, [userId]);

  const handleSignIn = useCallback(() => {
    signIn(userId).then(() => {
      history.replace('/chats');
    });
  }, [userId, history]);

  return (
    <div>
      <div>
        <img src="assets/whatsapp-icon.png" />
        <h1>WhatsApp</h1>
      </div>
      <form>
        <h2>Sign in</h2>
        <section>
          <MaterialTextField
            data-testid="user-id-input"
            label="User ID"
            value={userId}
            onChange={onUserIdChange}
            margin="normal"
            placeholder="Enter the current user ID"
          />
        </section>
        <MaterialButton
          data-testid="sign-in-button"
          type="button"
          color="secondary"
          variant="contained"
          disabled={!maySignIn()}
          onClick={handleSignIn}
        >
          Sign In
        </MaterialButton>
      </form>
    </div>
  );
};
