import { CommonModule, NgClass } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import Swal from 'sweetalert2';
import { Score, Student, Teacher } from '../../../core/interfaces';
import { ScoresService } from './../../../core/services/scores.service';
import { StudentsService } from '../../../core/services/students.service';
import { TeachersService } from '../../../core/services/teachers.service';

@Component({
  selector: 'app-scores-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: './scores-detail.component.html',
  styles: ``,
})
export class ScoresDetailComponent implements OnInit {
  @Input('id') public idScore: string = '';
  public scoresService = inject(ScoresService);
  public studentsService = inject(StudentsService);
  public teachersService = inject(TeachersService);

  public isNew: boolean = true;
  private router = inject(Router);

  public students: Student[] = [];
  public teachers: Teacher[] = [];

  public numRegex: RegExp = /^\d*\.?\d*$/;
  private formBuilder = inject(FormBuilder);
  public myForm: FormGroup = this.formBuilder.group({
    id: [0],
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    value: [null, [Validators.required, Validators.pattern(this.numRegex)]],
    idStudent: [this.students[0], [Validators.required]],
    idTeacher: [this.teachers[0], [Validators.required]],
  });

  constructor() {}

  get currentScoreForm(): Score {
    return this.myForm.value as Score;
  }

  ngOnInit(): void {
    this.isNew = this.idScore ? false : true;

    if (this.idScore) {
      this.scoresService.getScore(+this.idScore).subscribe({
        next: (result) =>
          this.myForm.setValue({
            id: result.id,
            name: result.name,
            value: result.value,
            idStudent: result.idStudent,
            idTeacher: result.idTeacher,
          }),
        error: (message) => Swal.fire('Error', message, 'error'),
      });
    }

    this.studentsService.getStudents(null).subscribe({
      next: (result) => (this.students = result.data),
      error: (message) => Swal.fire('Error', message, 'error'),
    });

    this.teachersService.getTeachers(null).subscribe({
      next: (result) => (this.teachers = result.data),
      error: (message) => Swal.fire('Error', message, 'error'),
    });
  }

  save() {
    if (this.myForm.invalid && !this.myForm.pristine) return;

    if (this.isNew) {
      this.scoresService.postScore(this.currentScoreForm).subscribe({
        next: (result) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Nota guardada',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigateByUrl('/layout/scores');
        },
        error: (message) => Swal.fire('Error', message, 'error'),
      });
    } else {
      this.scoresService.putScore(this.currentScoreForm).subscribe({
        next: (result) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Nota actualizada',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigateByUrl('/layout/scores');
        },
        error: (error) =>
          Swal.fire(error.Message, error.Errors.join('<br>'), 'error'),
      });
    }
  }
}
