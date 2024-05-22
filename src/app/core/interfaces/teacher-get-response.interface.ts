import { Teacher } from './teacher.interface';

export interface TeacherGetResponse {
  succeded: boolean;
  message: string;
  errors: string[];
  data: Teacher;
}
