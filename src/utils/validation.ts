export const isValidValue = (value: string) => {
  return value;
};

export const isValidName = (name: string) => {
  return /^[가-힣]+$/.test(name);
};

export const isValidNickname = (nickname: string) => {
  return /^[가-힣a-zA-Z0-9]{2,12}$/.test(nickname);
};

export const isValidId = (id: string) => {
  if (id.length < 5 || id.length > 15) {
    return false;
  }
  if (!/^[A-Za-z0-9][A-Za-z0-9]*$/.test(id)) {
    return false;
  }
  return true;
};

export const isValidPassWord = (pw: string) => {
  return /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]{8,}$/.test(pw);
};

export const arePasswordsEqual = (pw: string, pwCheck: string): boolean => {
  return pw === pwCheck;
};

export const isValidEmail = (email: string) => {
  return /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*(\.[A-Za-z]{1,})+$/.test(email);
};

export const isValidPhoneNum = (phoneNumber: string) => {
  return /^01[0-9]{9}$/.test(phoneNumber);
};

export const isValidLocation = (location: string) => {
  return /^[가-힣]+$/.test(location);
};
