import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Módulos propios
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './components/shared/shared.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,      // Puedes quitarlo si ya está en SharedModule, pero no afecta
    SharedModule,          // Muy importante: contiene Angular Material y ReactiveForms
    AppRoutingModule       // Se importa al final para asegurarse de aplicar rutas correctamente
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
