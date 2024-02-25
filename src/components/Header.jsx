import React, { useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/store/userSlice";
import { NETFLIX_LOGO, USER_AVATAR } from "../utils/constants";
import { toggleGPTSearchView } from "../utils/store/GPTSearchSlice";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);
  // const user = selector.user;

  /**
   * 1. Instead of dispatching actions for login, signup and logout from different code points, we can define the 'onAuthStateChanged' listener
   * at one place which handles all the possibble authStates
   * 2. This 'onAuthStateChanged' is given by Firebase itself and is executed on auth state change
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        // on successful login or signup redirect the user to /browse page
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  const handleGPTSearchClick = () => {
    dispatch(toggleGPTSearchView());
  };

  return (
    <div className="absolute px-4 md:px-8 py-1  bg-gradient-to-b from-black z-10 w-screen flex flex-col justify-center items-center md:flex-row md:justify-between ">
      <div className="mx-auto md:mx-0">
        <img className=" w-[200px]" src={NETFLIX_LOGO} alt="" />
      </div>

      {user && (
        <div className="flex gap-6 md:gap-5 md:items-center md:justify-between">
          <LanguageSelector />
          <button
            className=" px-2 md:px-4 md:py-2 bg-purple-600 rounded-lg text-white"
            onClick={handleGPTSearchClick}
          >
            {showGPTSearch ? "Home" : "GPT Search"}
          </button>
          <img
            // src=
            src={user.photoURL}
            alt=""
            className="h-12 md:h-10 rounded-full"
          />
          <button
            className="px-2 md:py-2 border-none rounded-lg bg-slate-600 text-gray-300 hover:text-white text-sm"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
