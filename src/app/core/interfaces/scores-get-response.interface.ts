import { Score } from './score.interface';

export interface ScoresGetResponse {
  succeded: boolean;
  message: string;
  errors: string[];
  data: Score[];
}
