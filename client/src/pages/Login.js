import { useState } from 'react';

export default function Login() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  // Perform login process
  const login = () => {
    setAuth(true);
    const id = Math.floor(Math.random() * 3);
    console.log(id);
  }

  login('test@gmail.com', '1234');

  return (
    <button
      className="btn btn-primary border-2 border-teal font-header text-3xl"
      onClick={() => login()}
    >
      SIGN IN
    </button>
  )
}