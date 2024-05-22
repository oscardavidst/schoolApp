import { CommonModule, NgClass } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import Swal from 'sweetalert2';
import { StudentsService } from './../../../core/services/students.service';
import { Student } from '../../../core/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: './students-detail.component.html',
  styles: ``,
})
export class StudentsDetailComponent implements OnInit {
  @Input('id') public idStudent: string = '';
  public studentsService = inject(StudentsService);
  public isNew: boolean = true;
  private router = inject(Router);

  private formBuilder = inject(FormBuilder);
  public myForm: FormGroup = this.formBuilder.group({
    id: [0],
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
  });

  constructor() {}

  get currentStudentForm(): Student {
    return this.myForm.value as Student;
  }

  ngOnInit(): void {
    this.isNew = this.idStudent ? false : true;

    if (this.idStudent) {
      this.studentsService.getStudent(+this.idStudent).subscribe({
        next: (result) => this.myForm.setValue(result),
        error: (message) => Swal.fire('Error', message, 'error'),
      });
    }
  }

  save() {
    if (this.myForm.invalid && !this.myForm.pristine) return;

    if (this.isNew) {
      this.studentsService.postStudent(this.currentStudentForm).subscribe({
        next: (result) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Estudiante guardado',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigateByUrl('/layout/students');
        },
        error: (message) => Swal.fire('Error', message, 'error'),
      });
    } else {
      this.studentsService.putStudent(this.currentStudentForm).subscribe({
        next: (result) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Estudiante actualizado',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigateByUrl('/layout/students');
        },
        error: (message) => Swal.fire('Error', message, 'error'),
      });
    }
  }
}
