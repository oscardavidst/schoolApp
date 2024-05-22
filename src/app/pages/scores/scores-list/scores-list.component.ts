import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import Swal from 'sweetalert2';
import { TeachersService } from '../../../core/services/teachers.service';
import { StudentsService } from '../../../core/services/students.service';
import { ScoresService } from '../../../core/services/scores.service';
import { Score, Student, Teacher } from '../../../core/interfaces';

@Component({
  selector: 'app-scores-list',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './scores-list.component.html',
  styles: ``,
})
export class ScoresListComponent implements OnInit {
  public scoresService = inject(ScoresService);
  public studentsService = inject(StudentsService);
  public teachersService = inject(TeachersService);

  public scores: Score[] = [];
  public students: Student[] = [];
  public teachers: Teacher[] = [];

  public numRegex: RegExp = /^\d*\.?\d*$/;
  private formBuilder = inject(FormBuilder);
  public myForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.maxLength(50)],
    value: [null, [Validators.pattern(this.numRegex)]],
    idStudent: [this.students[0]],
    idTeacher: [this.teachers[0]],
  });

  ngOnInit(): void {
    this.scoresService.getScores(null, null, null, null).subscribe({
      next: (result) => (this.scores = result.data),
      error: (message) => Swal.fire('Error', message, 'error'),
    });

    this.studentsService.getStudents(null).subscribe({
      next: (result) => (this.students = result.data),
      error: (message) => Swal.fire('Error', message, 'error'),
    });

    this.teachersService.getTeachers(null).subscribe({
      next: (result) => (this.teachers = result.data),
      error: (message) => Swal.fire('Error', message, 'error'),
    });
  }

  searchScores(): void {
    if (this.myForm.invalid) return;
    const { name, value, idStudent, idTeacher } = this.myForm.value;
    this.scoresService
      .getScores(
        name === '' ? null : name,
        value ?? null,
        idStudent === '0' ? null : +idStudent,
        idTeacher === '0' ? null : +idTeacher
      )
      .subscribe({
        next: (result) => (this.scores = result.data),
        error: (message) => Swal.fire('Error', message, 'error'),
      });
  }

  deleteScore(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarla!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.scoresService.deleteScore(id).subscribe({
          next: (result) => {
            Swal.fire({
              title: 'Borrada!',
              text: 'Nota borrada.',
              icon: 'success',
            });
            this.searchScores();
          },
          error: (message) => Swal.fire('Error', message, 'error'),
        });
      }
    });
  }
}
