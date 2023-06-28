import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../state/store';
import { useNavigate } from 'react-router-dom';
import { Page } from '.';
import axios from 'axios';
import { UsersApi } from '../data/UsersAPIs';
import { DataServer } from '../data/DataserverSettings';
import { DBUser } from '../utils/ValidateLogin';

const ADMIN: number = 1;
const USERS_LOADED = 'loaded all users';
const usersEndpoint = '';

const ManageUsers = () => {
  const usersApi = new UsersApi(DataServer.hostname, DataServer.port);
  const { user } = useAppSelector((state) => state.user);
  const [users, setUsers] = useState<DBUser[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllUsers = async () => {
      if (!user) {
        navigate(Page.LOGIN);
      } else {
        if (Number.parseInt(user.rights) === ADMIN) {
          setUsers(await usersApi.getAllUsers());
          console.log(USERS_LOADED);
        }
      }
    };

    getAllUsers();
  }, []);

  return (
    <div>
      <div>logged in user:{JSON.stringify(user)}</div>
      <hr />
      <ul>
        {users.map((user) => (
          <li key={user.userid}>{JSON.stringify(user)}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
