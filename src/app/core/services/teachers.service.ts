import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable, catchError, map, throwError } from 'rxjs';
import {
  Teacher,
  TeachersGetResponse,
  TeacherGetResponse,
  TeacherPostPutDeleteResponse,
} from '../interfaces';

@Injectable({ providedIn: 'root' })
export class TeachersService {
  private http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;

  constructor() {}

  getTeachers(name: string | null): Observable<TeachersGetResponse> {
    const url = `${this.baseUrl}/Teachers${name ? `?Name=${name}` : ''}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http.get<TeachersGetResponse>(url, { headers }).pipe(
      map((resp) => {
        return resp;
      }),
      catchError((err) => {
        return throwError(() => err.error.Message);
      })
    );
  }

  getTeacher(id: number): Observable<Teacher> {
    const url = `${this.baseUrl}/Teachers/${id}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http.get<TeacherGetResponse>(url, { headers }).pipe(
      map((resp) => {
        return resp.data;
      }),
      catchError((err) => {
        return throwError(() => err.error.Message);
      })
    );
  }

  postTeacher(score: Teacher): Observable<number> {
    const url = `${this.baseUrl}/Teachers`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    const body = { id: score.id, name: score.name };

    return this.http
      .post<TeacherPostPutDeleteResponse>(url, body, { headers })
      .pipe(
        map((resp) => {
          return resp.data;
        }),
        catchError((err) => {
          return throwError(() => err.error.Message);
        })
      );
  }

  putTeacher(score: Teacher): Observable<number> {
    const url = `${this.baseUrl}/Teachers`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    const body = { id: score.id, name: score.name };

    return this.http
      .put<TeacherPostPutDeleteResponse>(url, body, { headers })
      .pipe(
        map((resp) => {
          return resp.data;
        }),
        catchError((err) => {
          return throwError(() => err.error.Message);
        })
      );
  }

  deleteTeacher(id: number): Observable<number> {
    const url = `${this.baseUrl}/Teachers/${id}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http
      .delete<TeacherPostPutDeleteResponse>(url, { headers })
      .pipe(
        map((resp) => {
          return resp.data;
        }),
        catchError((err) => {
          return throwError(() => err.error.Message);
        })
      );
  }
}
