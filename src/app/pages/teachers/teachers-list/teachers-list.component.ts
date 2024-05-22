import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TeachersService } from '../../../core/services/teachers.service';
import { Teacher } from '../../../core/interfaces';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth.service';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';

@Component({
  selector: 'app-teachers-list',
  standalone: true,
  imports: [RouterLink, SearchBoxComponent],
  templateUrl: './teachers-list.component.html',
  styles: ``,
})
export class TeachersListComponent implements OnInit {
  public authService = inject(AuthService);
  public teachersService = inject(TeachersService);

  public teachers: Teacher[] = [];
  public searchValue: string = '';

  ngOnInit(): void {
    this.teachersService.getTeachers(null).subscribe({
      next: (result) => (this.teachers = result.data),
      error: (message) => Swal.fire('Error', message, 'error'),
    });
  }

  searchTeachers(name: string): void {
    this.searchValue = name;
    this.teachersService.getTeachers(name === '' ? null : name).subscribe({
      next: (result) => (this.teachers = result.data),
      error: (message) => Swal.fire('Error', message, 'error'),
    });
  }

  deleteTeacher(id: number): void {
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
        this.teachersService.deleteTeacher(id).subscribe({
          next: (result) => {
            Swal.fire({
              title: 'Borrado!',
              text: 'Profesor borrado.',
              icon: 'success',
            });
            this.searchTeachers(this.searchValue);
          },
          error: (message) => Swal.fire('Error', message, 'error'),
        });
      }
    });
  }
}
