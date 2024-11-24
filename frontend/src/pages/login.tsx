import React, {useState} from 'react'
import SignIn from "../components/sign-in/SignIn";
import SignUp from "../components/sign-up/SignUp";

const login = () => {
  const [account, setAccount] = useState(true);
  const switchToSignUp = () => setAccount(false);
  const switchToSignIn = () => setAccount(true);
  return (
    <div>
      {account ? <SignIn switchToSignUp={switchToSignUp}/> : <SignUp switchToSignIn={switchToSignIn}/>}
    </div>
  )
}

export default login