import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, AfterViewInit {

  listUsuarios: Usuario[] = [];
  displayedColumns: string[] = ['idUsuario', 'nombre', 'apellido', 'correo', 'rol', 'fnacimiento', 'estado', 'acciones'];
  dataSource!: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _usuarioService: UsuarioService,
    private _snackbar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

   cargarUsuarios() {
    this._usuarioService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.listUsuarios = usuarios;
        this.dataSource = new MatTableDataSource(this.listUsuarios);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },

      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this._snackbar.open('Error al cargar usuarios', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    });
  }

    ngAfterViewInit(): void {
  if (this.dataSource) {
    this.dataSource.paginator = this.paginator;
  }
}
  agregarUsuario(){
    const dialogRef = this.dialog.open(AgregarUsuarioComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation: false,
      position: {top: '100px'},
      width: '800px',
      height:'auto',
      data: {
        tipo: 'CREAR'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this._snackbar.open('Usuario creado correctamente.', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });

      this.cargarUsuarios(); // 👈 vuelve a cargar la tabla de usuarios
    }
  });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

editarUsuario(usuario: Usuario) {
  const dialogRef = this.dialog.open(AgregarUsuarioComponent, {
    disableClose: true,
    autoFocus: true,
    width: '800px',
    data: {
      tipo: 'EDITAR',
      usuario: usuario
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this._snackbar.open('Usuario actualizado correctamente.', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      this.cargarUsuarios();
    }
  });
}


 eliminarUsuario(id: number) {
  Swal.fire({
    title: '¿Está seguro?',
    text: 'Esta acción eliminará el usuario de forma permanente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this._usuarioService.eliminarUsuario(id).subscribe({
        next: () => {
          Swal.fire('Eliminado', 'El usuario fue eliminado correctamente.', 'success');
          this.cargarUsuarios();
        },
        error: (err) => {
          console.error('Error al eliminar usuario:', err);
          Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
        }
      });
    }
  });
}


}
