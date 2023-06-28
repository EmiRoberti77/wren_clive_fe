import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../state/store';
import { useNavigate } from 'react-router-dom';
import { Page } from '.';
import axios from 'axios';
import { UsersApi } from '../data/UsersAPIs';
import { DataServer } from '../data/DataserverSettings';
import { DBUser } from '../utils/ValidateLogin';
import { UserComponent } from '../components/users/UserComponent';
import UserProfile from '../components/users/UserProfile';

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
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Logged in user</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <UserProfile user={user!} />
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Data</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userid}>
                <td>{user.userid}</td>
                <td>
                  <UserComponent user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUsers;
