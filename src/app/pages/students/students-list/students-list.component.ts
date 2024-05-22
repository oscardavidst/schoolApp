import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StudentsService } from '../../../core/services/students.service';
import { Student } from '../../../core/interfaces';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth.service';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [RouterLink, SearchBoxComponent],
  templateUrl: './students-list.component.html',
  styles: ``,
})
export class StudentsListComponent implements OnInit {
  public authService = inject(AuthService);
  public studentsService = inject(StudentsService);

  public students: Student[] = [];
  public searchValue: string = '';

  ngOnInit(): void {
    this.studentsService.getStudents(null).subscribe({
      next: (result) => (this.students = result.data),
      error: (message) => Swal.fire('Error', message, 'error'),
    });
  }

  searchStudents(name: string): void {
    this.searchValue = name;
    this.studentsService.getStudents(name === '' ? null : name).subscribe({
      next: (result) => (this.students = result.data),
      error: (message) => Swal.fire('Error', message, 'error'),
    });
  }

  deleteStudent(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentsService.deleteStudent(id).subscribe({
          next: (result) => {
            Swal.fire({
              title: 'Borrado!',
              text: 'Estudiante borrado.',
              icon: 'success',
            });
            this.searchStudents(this.searchValue);
          },
          error: (message) => Swal.fire('Error', message, 'error'),
        });
      }
    });
  }
}
