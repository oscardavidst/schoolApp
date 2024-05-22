import { Student } from './student.interface';

export interface StudentGetResponse {
  succeded: boolean;
  message: string;
  errors: string[];
  data: Student;
}
