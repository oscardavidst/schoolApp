import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable, catchError, map, throwError } from 'rxjs';
import {
  Student,
  StudentsGetResponse,
  StudentGetResponse,
  StudentPostPutDeleteResponse,
} from '../interfaces';

@Injectable({ providedIn: 'root' })
export class StudentsService {
  private http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;

  constructor() {}

  getStudents(name: string | null): Observable<StudentsGetResponse> {
    const url = `${this.baseUrl}/Students${name ? `?Name=${name}` : ''}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http.get<StudentsGetResponse>(url, { headers }).pipe(
      map((resp) => {
        return resp;
      }),
      catchError((err) => {
        return throwError(() => err.error.Message);
      })
    );
  }

  getStudent(id: number): Observable<Student> {
    const url = `${this.baseUrl}/Students/${id}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http.get<StudentGetResponse>(url, { headers }).pipe(
      map((resp) => {
        return resp.data;
      }),
      catchError((err) => {
        return throwError(() => err.error.Message);
      })
    );
  }

  postStudent(student: Student): Observable<number> {
    const url = `${this.baseUrl}/Students`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    const body = { id: student.id, name: student.name };

    return this.http
      .post<StudentPostPutDeleteResponse>(url, body, { headers })
      .pipe(
        map((resp) => {
          return resp.data;
        }),
        catchError((err) => {
          return throwError(() => err.error.Message);
        })
      );
  }

  putStudent(student: Student): Observable<number> {
    const url = `${this.baseUrl}/Students`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    const body = { id: student.id, name: student.name };

    return this.http
      .put<StudentPostPutDeleteResponse>(url, body, { headers })
      .pipe(
        map((resp) => {
          return resp.data;
        }),
        catchError((err) => {
          return throwError(() => err.error.Message);
        })
      );
  }

  deleteStudent(id: number): Observable<number> {
    const url = `${this.baseUrl}/Students/${id}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http
      .delete<StudentPostPutDeleteResponse>(url, { headers })
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
