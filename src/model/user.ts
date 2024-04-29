// 로그인
export interface PostLoginRequest {
  userId: string;
  password: string;
}

export interface PostLoginResponse {
  token: string;
}

// 회원가입
export interface PostSignupRequest {
  userId: string;
  password: string;
  name: string;
  nickname: string;
  email: string;
  emailSecret: boolean;
  phone: string;
  phoneSecret: boolean;
  userType: string;
}

// 회원 유형 (enum)
export interface GetUserTypesResponse {
  results: { code: string; label: string }[];
}

// 중복체크
export interface GetExistUserIdRequest {
  userId: string;
}
export interface GetExistNicknameRequest {
  nickname: string;
}
export interface GetExistEmailRequest {
  email: string;
}
export interface GetExistReponse {
  available: boolean;
}

export interface GetLikeUsersResponse {
  results: {
    userId: number;
    userType: string;
    nickname: string;
  }[];
  count: number;
}

export interface PostLikeUserResponse {
  success: boolean;
}

export interface DeleteLikeUserResponse {
  success: boolean;
}

export interface GetUserResponse {
  name: string;
  nickname: string;
  userId: string;
  email: string;
  phone: string;
  regions: Array<string>;
  isPrivateEmail: boolean;
  isPrivatePhone: boolean;
  userType: string;
}
// 회원 아이디 찾기
export interface GetUserIdRequest {
  name: string;
  email: string;
}

export interface GetUserIdResponse {
  userId: string;
}

// 비밀번호 찾기
export interface GetUserExistRequest {
  name: string;
  email: string;
  userId: string;
}

export interface GetUserExistResponse {
  email: string;
}

// 이메일 인증
export interface PostUserCertEmailRequest {
  certCode: string;
}

export interface PostUserCertEmailResponse {
  token: string;
}

// 비밀번호 변경
export interface PutUserPasswordRequest {
  token: string;
  newPassword: string;
}

// 회원 타입 조회
export interface GetUserTypeRequest {
  userId: string;
}

export interface GetUserTypeResponse {
  userType: string;
}

// 회원 프로필 조회
export interface GetUserProfileRequest {
  userId: string;
}

export interface GetUserProfileResponse {
  nickname: string;
  email: string | null;
  phone: string | null;
  intro: string;
}

// 내 소개글 생성 및 수정
export interface PutUserIntroRequest {
  intro: string;
}

// Oauth
export interface PostKakaoLoginRequest {
  code: string;
}

export interface PostKakaoLoginResponse {
  token: string;
}

export interface PostNaverLoginRequest {
  code: string;
}

export interface PostNaverLoginResponse {
  token: string;
}
