import React, { useEffect, useState } from 'react';
import { DBUser } from '../../utils/ValidateLogin';

interface UserPrfileProps {
  user: DBUser;
}

const UserProfile: React.FC<UserPrfileProps> = ({ user }) => {
  const [name, setName] = useState<string>('');
  const [surnname, setSurName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [policy, setPolicy] = useState<number>();
  const [company, setCompany] = useState<string>('');
  const [rights, setRights] = useState<number>();
  const [email, setEmail] = useState<string>('');

  const onUpDateUser = () => {};
  const onCreateNewUser = () => {};

  useEffect(() => {
    setName(user.name);
    setSurName(user.surname);
    setPhone(user.phone);
    setPolicy(Number.parseInt(user.policy));
    setCompany(user.company);
    setRights(Number.parseInt(user.rights));
  }, []);

  return (
    <div className="user-profile">
      <div className="profile-details">
        <button>Update</button>
        <button>New User</button>
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
