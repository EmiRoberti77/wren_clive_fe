import axios from 'axios';

const getUserEndpoint = (username: string, password: string) =>
  `http://localhost:3000/api/v1/users/finduser?username=${username}&password=${password}`;

export interface DBUser {
  userid: number;
  company: string;
  policy: string;
  rights: string;
  name: string;
  surname: string;
  phone: string;
  username: string;
  email: string;
  password: string;
  date: string | null;
}

export const getUserbyEmailPass = async (
  useremail: string,
  userpassword: string
): Promise<DBUser[]> => {
  console.log(getUserEndpoint(useremail, userpassword));

  const response = await axios.get(getUserEndpoint(useremail, userpassword));

  console.log('response.data', response.data);
  return response.data.body.message as DBUser[];
};
