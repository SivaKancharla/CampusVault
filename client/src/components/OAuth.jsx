import React from 'react';
import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { app } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

export default function OAuth() {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try{
            const resultsFromGoogle = await signInWithPopup(auth, provider); 
            // console.log(resultsFromGoogle);
            const res = await fetch(
                '/api/auth/google',
                {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
                }
            );
            // console.log(resultsFromGoogle);
            const data = await res.json();
            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate('/');
            }
        } catch(error){
            console.log(error);
        }
    }
  return (
    <Button
      type="button"
      className="
        border-2 border-pink-500
        bg-transparent
        text-black
        hover:bg-gradient-to-r
        hover:from-pink-500
        hover:to-orange-400
        hover:text-white
        focus:ring-0
      "
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
}