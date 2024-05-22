import { Teacher } from './teacher.interface';

export interface TeachersGetResponse {
  succeded: boolean;
  message: string;
  errors: string[];
  data: Teacher[];
}
