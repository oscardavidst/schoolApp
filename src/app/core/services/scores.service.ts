import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable, catchError, map, throwError } from 'rxjs';
import {
  Score,
  ScoresGetResponse,
  ScoreGetResponse,
  ScorePostPutDeleteResponse,
} from '../interfaces';

@Injectable({ providedIn: 'root' })
export class ScoresService {
  private http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;

  constructor() {}

  getScores(
    name: string | null,
    value: number | null,
    idStudent: number | null,
    idTeacher: number | null
  ): Observable<ScoresGetResponse> {
    let params: string[] = [];
    let urlParams: string = ``;
    if (name) params.push(`Name=${name}`);
    if (value) params.push(`Value=${value}`);
    if (idStudent) params.push(`IdStudent=${idStudent}`);
    if (idTeacher) params.push(`IdTeacher=${idTeacher}`);
    if (params.length > 0) urlParams = `?` + params.join('&');

    const url = `${this.baseUrl}/Scores${urlParams}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http.get<ScoresGetResponse>(url, { headers }).pipe(
      map((resp) => {
        return resp;
      }),
      catchError((err) => {
        return throwError(() => err.error.Message);
      })
    );
  }

  getScore(id: number): Observable<Score> {
    const url = `${this.baseUrl}/Scores/${id}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http.get<ScoreGetResponse>(url, { headers }).pipe(
      map((resp) => {
        return resp.data;
      }),
      catchError((err) => {
        return throwError(() => err.error.Message);
      })
    );
  }

  postScore(score: Score): Observable<number> {
    const url = `${this.baseUrl}/Scores`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    const body = {
      id: score.id,
      name: score.name,
      value: score.value,
      idStudent: score.idStudent,
      idTeacher: score.idTeacher,
    };

    return this.http
      .post<ScorePostPutDeleteResponse>(url, body, { headers })
      .pipe(
        map((resp) => {
          return resp.data;
        }),
        catchError((err) => {
          return throwError(() => err.error.Message);
        })
      );
  }

  putScore(score: Score): Observable<number> {
    const url = `${this.baseUrl}/Scores`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    const body = {
      id: score.id,
      name: score.name,
      value: score.value,
      idStudent: score.idStudent,
      idTeacher: score.idTeacher,
    };

    return this.http
      .put<ScorePostPutDeleteResponse>(url, body, { headers })
      .pipe(
        map((resp) => {
          return resp.data;
        }),
        catchError((err) => {
          return throwError(() => err.error);
        })
      );
  }

  deleteScore(id: number): Observable<number> {
    const url = `${this.baseUrl}/Scores/${id}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http.delete<ScorePostPutDeleteResponse>(url, { headers }).pipe(
      map((resp) => {
        return resp.data;
      }),
      catchError((err) => {
        return throwError(() => err.error.Message);
      })
    );
  }
}
