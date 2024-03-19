
interface UserName {
  username: {
    value: string;
    isValid: boolean;
  };
}

interface Login {
  email: {
    value: string;
    isValid: boolean;
  };
  password: {
    value: string;
    isValid: boolean;
  };
}

interface User {
  email: string;
  username: string;
  bio: string
  userImg: string
}

interface UserProfile {
  userimg: {
    value: string;
    isValid: boolean;
  };
  username: {
    value: string;
    isValid: boolean;
  };
  userbio: {
    value: string;
    isValid: boolean;
  };
}

type Signup = UserName & Login

export { Login, Signup, User, UserProfile }
