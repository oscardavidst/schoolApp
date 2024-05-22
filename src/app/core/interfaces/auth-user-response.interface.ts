export interface User {
  id: string;
  userName: string;
  email: string;
  roles: string[];
  isVerified: boolean;
  jwToken: string;
}
