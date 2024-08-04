export interface AccessToken {
  token: string;
  expires: number;
}

interface LoginResponse {
  accessToken: AccessToken;
}

export default LoginResponse;
