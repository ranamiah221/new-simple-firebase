import {GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth'
import app from '../../firebase/firebase.init';
import { useState } from 'react';
const Login = () => {
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


const [user, setUser]=useState(null);

const handleGoogleSingIn = () =>{
   signInWithPopup(auth, googleProvider)
   .then(result =>{
       const SignInUser = result.user;
       setUser(SignInUser);
       console.log(SignInUser);
   })
   .catch(error =>{
    console.log('error',error.message);
   })
}
const handleGithubSignIn=()=>{
    signInWithPopup(auth, githubProvider)
    .then(result=>{
        const logedInUser= result.user;
        setUser(logedInUser);
    })
    .catch(error=>{
     console.log(error.message);
    })
}
const handleGoogleSignOut =()=>{
    signOut(auth)
    .then(result  =>{
         console.log(result)
        setUser(null)
    })
    .catch(error=>{
        console.log(error);
    })
}



    return (
        <div>
           {
            user ? <button onClick={handleGoogleSignOut}>sign out</button> :
            <div>
                 <button onClick={handleGoogleSingIn}>Google sing in</button>
                 <button onClick={handleGithubSignIn} >Github sign in</button>
            </div>
            
            
           }
           { user &&  <div>
                <h2>User : {user.displayName}</h2>
                <p>email : {user.email}</p>
                <img src={user.photoURL} alt="" />
            </div>

           }
        </div>
    );
};

export default Login;