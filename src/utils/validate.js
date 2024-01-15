export const validate = (email, password, isLoginForm, name) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const isValidEmail = emailRegex.test(email);
  const isValidPwd = pwdRegex.test(password);

  if (!isLoginForm && name.length < 3) return "Name is not valid";

  if (!isValidEmail) return "Email is not valid";

  if (!isValidPwd) return "Password is not valid";

  return null;
};
