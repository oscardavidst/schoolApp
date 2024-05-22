import { Score } from './score.interface';

export interface ScoreGetResponse {
  succeded: boolean;
  message: string;
  errors: string[];
  data: Score;
}
