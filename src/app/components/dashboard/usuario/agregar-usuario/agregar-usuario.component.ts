import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {
  formGroup!: FormGroup;
  esEditar: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarUsuarioComponent>,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.esEditar = this.data?.tipo === 'EDITAR';

    if (this.esEditar && this.data.usuario) {
      this.formGroup.patchValue(this.data.usuario);
    }
  }

 guardar() {
  if (this.formGroup.valid) {
    const usuario: Usuario = { ...this.formGroup.value };

    // Convertir a formato YYYY-MM-DD de forma segura
    if (usuario.fnacimiento) {
      const fecha = new Date(usuario.fnacimiento);
      usuario.fnacimiento = fecha.toISOString().split('T')[0];
    }

    if (this.esEditar) {
      const id = this.data.usuario.idUsuario;
      this.usuarioService.actualizarUsuario(id, usuario).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Error al actualizar usuario:', err)
      });
    } else {
      this.usuarioService.crearUsuario(usuario).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Error al crear usuario:', err)
      });
    }
  } else {
    this.formGroup.markAllAsTouched();
  }
}


  cancelar() {
    this.dialogRef.close();
  }

  initForm() {
    this.formGroup = this.fb.group({
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      correo: [null, Validators.required],
      rol: [null, Validators.required],
      fnacimiento: [null, Validators.required],
      password: [null, Validators.required],
      estado: [true, Validators.required]
    });
  }
}
