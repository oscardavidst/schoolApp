import { User } from './auth-user-response.interface';

export interface AuthLoginResponse {
  succeded: boolean;
  message: string;
  errors: string[];
  data: User;
}
