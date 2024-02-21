const isValidName = (name: string) => {
  return /^[가-힣]+$/.test(name);
};

const isValidId = (id: string) => {
  if (id.length < 5 || id.length > 15) {
    return false;
  }
  if (!/^[A-Za-z0-9][A-Za-z0-9]*$/.test(id)) {
    return false;
  }
  return true;
};

const isValidPassWord = (pw: string) => {
  return /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]{8,}$/.test(pw);
};

const arePasswordsEqual = (pw: string, pwCheck: string): boolean => {
  return pw === pwCheck;
};

const isValidEmail = (email: string) => {
  return /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*(\.[A-Za-z]{1,})+$/.test(email);
};

const isValidPhoneNum = (phoneNumber: string) => {
  return /^01[0-9]{9}$/.test(phoneNumber);
};

const isValidLocation = (location: string) => {
  return /^[가-힣]+$/.test(location);
};

export { isValidName, isValidId, isValidPassWord, arePasswordsEqual, isValidEmail, isValidPhoneNum, isValidLocation };
