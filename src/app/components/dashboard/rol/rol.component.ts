import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Rol } from 'src/app/interfaces/rol';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit, AfterViewInit {

  listRoles: Rol[] = [];
  displayedColumns: string[] = ['idRol', 'nombre', 'descripcion', 'fcreacion', 'fmodificacion', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _rolService: RolService,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cargarRoles();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarRoles() {
    this._rolService.getRoles().subscribe({
      next: (roles) => {
        this.listRoles = roles;
        this.dataSource.data = this.listRoles;
      },
      error: (err) => {
        console.error('Error al cargar el Rol: ', err);
        this._snackbar.open('Error al cargar Rol', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    });
  }

}
