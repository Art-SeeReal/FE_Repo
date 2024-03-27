export const isValidValue = (value: string) => {
  return value;
};

export const isValidUserId = (userId: string) => {
  return /^[a-z]+[a-z0-9]{4,14}$/g.test(userId);
};

export const isValidPassword = (password: string) => {
  return /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}/g.test(password);
};

export const isValidName = (name: string) => {
  return /^[가-힣]{2,10}$/.test(name);
};

export const isValidPhone = (phone: string) => {
  return /^01[0-9]\d{3,4}\d{4}$/.test(phone);
};

export const isValidNickname = (nickname: string) => {
  return /^[가-힣a-zA-Z0-9]{2,12}$/.test(nickname);
};

export const isValidEmail = (email: string) => {
  return /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
};

export const arePasswordsEqual = (password: string, passwordCheck: string) => {
  return password === passwordCheck;
};

export const userIdErrorMessage = (userId: string) => {
  return isValidUserId(userId) ? '' : '아이디는 영문 소문자 또는 영문 소문자와 숫자를 포함한 5~15자로 입력하세요.';
};

export const passwordErrorMessage = (password: string) => {
  return isValidPassword(password) ? '' : '비밀번호는 영문, 숫자, 특수문자를 조합한 8~20자로 입력하세요.';
};

export const phoneErrorMessage = (phone: string) => {
  return isValidPhone(phone) ? '' : '휴대폰번호는 숫자로만 올바르게 입력하세요. 예)01012345678';
};

export const nicknameErrorMessage = (nickname: string) => {
  return isValidNickname(nickname) ? '' : '닉네임은 한글, 영문, 숫자만 가능하며, 2~12자로 입력하세요.';
};

export const emailErrorMessage = (email: string) => {
  return isValidEmail(email) ? '' : '이메일 형식에 맞게 입력하세요.';
};

export const existCheckErrorMessage = (value: string, label: string) => {
  return value === '1' ? '' : `${label} 중복체크가 필요합니다.`;
};

export const certPhoneErrorMessage = (value: string) => {
  return value === '1' ? '' : `휴대폰번호 인증이 필요합니다.`;
};

export const titleErrorMessage = (title: string) => {
  return isValidValue(title) ? '' : '제목을 입력해주세요.';
};

export const contentErrorMessage = (content: string) => {
  return isValidValue(content) ? '' : '내용을 입력해주세요.';
};
