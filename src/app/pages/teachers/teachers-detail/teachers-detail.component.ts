import { CommonModule, NgClass } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import Swal from 'sweetalert2';
import { TeachersService } from './../../../core/services/teachers.service';
import { Teacher } from '../../../core/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teachers-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: './teachers-detail.component.html',
  styles: ``,
})
export class TeachersDetailComponent implements OnInit {
  @Input('id') public idTeacher: string = '';
  public teachersService = inject(TeachersService);
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

  get currentTeacherForm(): Teacher {
    return this.myForm.value as Teacher;
  }

  ngOnInit(): void {
    this.isNew = this.idTeacher ? false : true;

    if (this.idTeacher) {
      this.teachersService.getTeacher(+this.idTeacher).subscribe({
        next: (result) => this.myForm.setValue(result),
        error: (message) => Swal.fire('Error', message, 'error'),
      });
    }
  }

  save() {
    if (this.myForm.invalid && !this.myForm.pristine) return;

    if (this.isNew) {
      this.teachersService.postTeacher(this.currentTeacherForm).subscribe({
        next: (result) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Profesor guardado',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigateByUrl('/layout/teachers');
        },
        error: (message) => Swal.fire('Error', message, 'error'),
      });
    } else {
      this.teachersService.putTeacher(this.currentTeacherForm).subscribe({
        next: (result) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Profesor actualizado',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigateByUrl('/layout/teachers');
        },
        error: (message) => Swal.fire('Error', message, 'error'),
      });
    }
  }
}
