import React, { useState, useRef } from "react";
import Header from "../components/Header";
import { validate } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import { NETFLIX_BG_IMG, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const dispatch = useDispatch();

  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const nameInput = useRef(null);

  const toggleAuthScreen = () => {
    setIsLoginForm(!isLoginForm);
    setErrorMsg(null);
  };

  const handleFormSubmit = () => {
    const errorMessage = validate(
      emailInput.current.value,
      passwordInput.current.value,
      isLoginForm,
      nameInput.current?.value
    );

    setErrorMsg(errorMessage);

    if (errorMessage) return;

    if (!isLoginForm) {
      // Signup flow
      createUserWithEmailAndPassword(
        auth,
        emailInput.current.value,
        passwordInput.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: nameInput.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              // dispatch action to add user with updated values
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  displayName: displayName,
                  email: email,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMsg(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(`${errorMessage} - ${errorCode}`);
        });
    } else {
      // Sign In flow
      signInWithEmailAndPassword(
        auth,
        emailInput.current.value,
        passwordInput.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(`${errorMessage}`);
        });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="relative w-full">
      <Header />
      <div>
        <img src={NETFLIX_BG_IMG} alt="" className="fixed object-cover" />
      </div>
      <div className="w-full absolute">
        <div className="w-[360px] md:w-[480px] m-auto mt-[120px] md:mt-[80px] py-8 px-8 wd:px-16 h-[660px] bg-black/80">
          <h1 className="  text-4xl text-white text-left py-8">
            {isLoginForm ? "Sign In" : "Sign Up"}
          </h1>
          <form className="flex-col" onSubmit={onSubmit}>
            {!isLoginForm && (
              <input
                type="text"
                placeholder="Enter name"
                className=" bg-[#333] text-gray-100 rounded-lg px-4 py-4 w-full mb-4"
                ref={nameInput}
              />
            )}
            <input
              ref={emailInput}
              type="text"
              placeholder="Enter email"
              className=" bg-[#333] text-gray-100 rounded-lg px-4 py-4 w-full mb-4"
            />
            <input
              ref={passwordInput}
              type="password"
              placeholder="Enter password"
              className="  bg-[#333] text-gray-100 rounded-lg px-4 py-4 w-full"
            />
            {errorMsg && <p className="text-red-600 py-2 px-1">{errorMsg}</p>}
            <button
              type="submit"
              className=" bg-red-600 text-white rounded-lg px-2 py-4 w-full mb-2 mt-10"
              onClick={handleFormSubmit}
            >
              {isLoginForm ? "Sign In" : "Sign Up"}
            </button>
          </form>
          <div className="flex justify-between mb-14">
            <div>
              <input type="checkbox" />
              <span className=" text-gray-300 text-sm"> Remember Me</span>
            </div>
            <p className=" text-gray-300 text-sm pr-2">Need help?</p>
          </div>
          <div className="flex-col space-y-8">
            <p
              className="text-gray-400 cursor-pointer"
              onClick={toggleAuthScreen}
            >
              {isLoginForm ? (
                <span>
                  New to Netflix?<a className="text-white"> Sign up Now</a>
                </span>
              ) : (
                <span>
                  Already a member?
                  <a className="text-white"> Sign in Now</a>
                </span>
              )}
            </p>
            <p className="text-gray-500 text-sm">
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot. <a className="text-blue-600">Learn more.</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
