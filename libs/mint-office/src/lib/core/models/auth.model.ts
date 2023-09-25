export interface AuthKey {
  encodedPublicKey: "string",
  preAuthenticationId: "string"
}

export interface AuthData {
  access_token: string;
  expires_in: Date;
  refresh_token: string;
  refresh_expires_in: Date;
  token_type: string;
  jwt_session: JwtSession;
  module_access: Array<any>;
}

export interface JwtSession {
  sessionId: number;
  clientId: string;
  cifNumber: string;
  sessionNo: string;
  sessionDate: string;
}

export interface Auth {
  authenticationId: string;
  grantType: string;
  username: string;
  password: string;
}
