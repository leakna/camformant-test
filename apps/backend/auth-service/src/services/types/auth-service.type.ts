export interface CognitoIdentities {
  dateCreated: string;
  providerName: string;
  userId: string;
  providerType: string;
  issuer: null,
  primary: string;
}

export interface CognitoToken {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  sub?: string;
  userId?: string;
}