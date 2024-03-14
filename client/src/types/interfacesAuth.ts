
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

type Signup = UserName & Login

export { Login, Signup }
