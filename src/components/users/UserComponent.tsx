import React from 'react';
import { DBUser } from '../../utils/ValidateLogin';

interface UserComponentProps {
  user: DBUser;
}

export const UserComponent: React.FC<UserComponentProps> = ({ user }) => {
  return (
    <div>
      <div>
        {user.name} , {user.surname} , {user.phone}, {user.company},{' '}
        {user.email}
      </div>
    </div>
  );
};
