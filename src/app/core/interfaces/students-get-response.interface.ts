import { Student } from './student.interface';

export interface StudentsGetResponse {
  succeded: boolean;
  message: string;
  errors: string[];
  data: Student[];
}
