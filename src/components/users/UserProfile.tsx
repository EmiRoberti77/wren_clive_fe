import React, { useEffect, useState } from 'react';
import { DBUser } from '../../utils/ValidateLogin';
import { UserService } from './UserService';
import { DataServer } from '../../data/DataserverSettings';
import { useAppSelector } from '../../state/store';
import axios from 'axios';

interface UserPrfileProps {
  dbuser: DBUser;
}

const UserProfile: React.FC<UserPrfileProps> = ({ dbuser }) => {
  const userService = new UserService(
    DataServer.hostname,
    DataServer.port.toString()
  );

  const { user } = useAppSelector((state) => state.user);
  const [name, setName] = useState<string>('');
  const [surnname, setSurName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [policy, setPolicy] = useState<number>(0);
  const [company, setCompany] = useState<string>('');
  const [rights, setRights] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onUpDateUser = async () => {
    const userParams: DBUser = {
      userid: user!.userid,
      company: company,
      policy: policy.toString(),
      rights: rights.toString(),
      name: name,
      surname: surnname,
      phone: phone,
      username: username,
      email: email,
      password: password,
    };

    await userService.updateUser(userParams);
  };

  const onCreateNewUser = async () => {
    const dbuser: DBUser = {
      company: company,
      policy: policy.toString(),
      rights: rights.toString(),
      name: name,
      surname: surnname,
      phone: phone,
      username: username,
      email: email,
      password: password,
    };

    await userService.addUser(dbuser);
  };

  useEffect(() => {
    setName(dbuser.name);
    setSurName(dbuser.surname);
    setPhone(dbuser.phone);
    setPolicy(Number.parseInt(dbuser.policy));
    setCompany(dbuser.company);
    setRights(Number.parseInt(dbuser.rights));
  }, []);

  return (
    <div className="user-profile">
      <div className="profile-details">
        <button onClick={() => onUpDateUser()}>Update</button>
        <button onClick={() => onCreateNewUser()}>New User</button>
        <h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName((state) => e.target.value)}
          />
          <input
            type="text"
            value={surnname}
            onChange={(e) => setSurName((state) => e.target.value)}
          />
        </h2>
        <div className="contact-details">
          <ul>
            <li>
              username:{' '}
              <input
                type="text"
                value={username}
                onChange={(e) => setUserName((state) => e.target.value)}
              />
            </li>
            <li>
              password:{' '}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword((state) => e.target.value)}
              />
            </li>
            <li>
              Email:{' '}
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail((state) => e.target.value)}
              />
            </li>
            <li>
              Phone:{' '}
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone((state) => e.target.value)}
              />
            </li>
            <li>
              Policy:{' '}
              <input
                type="text"
                value={policy}
                onChange={(e) =>
                  setPolicy((state) => Number.parseInt(e.target.value))
                }
              />
            </li>
            <li>
              Rights:{' '}
              <input
                type="text"
                value={rights}
                onChange={(e) =>
                  setRights((state) => Number.parseInt(e.target.value))
                }
              />
            </li>
            <li>
              Company:{' '}
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany((state) => e.target.value)}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
