const isValidName = (name: string) => {
  if (name.trim().length === 0) {
    return false;
  }
  return true;
};

const isValidNickName = (nickname: string) => {
  if (nickname.trim().length === 0) {
    return false;
  }
  return true;
};

const isValidId = (id: string) => {
  if (id.length < 4 || id.length > 15) {
    return false;
  }
  if (!/^[A-Za-z0-9][A-Za-z0-9]*$/.test(id)) {
    return false;
  }
  return true;
};

const isValidPassWord = (pw: string) => {
  if (!/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]{8,}$/.test(pw)) {
    return false;
  }
  return true;
};

const arePasswordsEqual = (pw: string, pwCheck: string): boolean => {
  return pw === pwCheck;
};

const isValidEmail = (email: string) => {
  if (email.trim().length === 0) {
    return false;
  }
  if (!/^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*(\.[A-Za-z]{1,})+$/.test(email)) {
    return false;
  }
  return true;
};

const isValidPhoneNum = (phoneNumber: string) => {
  if (!/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(phoneNumber)) {
    return false;
  }
  return true;
};

const isValidCheckBox = (check1: boolean, check2: boolean) => {
  if (!check1 && !check2) {
    return false;
  }
  return true;
};

export {
  isValidName,
  isValidNickName,
  isValidId,
  isValidPassWord,
  arePasswordsEqual,
  isValidEmail,
  isValidPhoneNum,
  isValidCheckBox,
};
