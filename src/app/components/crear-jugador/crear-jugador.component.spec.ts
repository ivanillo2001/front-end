import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearJugadorComponent } from './crear-jugador.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa este módulo
import { UsuarioService } from '../../servicios/usuario.service';

describe('Test del componente Crear Jugador', () => {
    let component: CrearJugadorComponent;
    let fixture: ComponentFixture<CrearJugadorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CrearJugadorComponent, ReactiveFormsModule, HttpClientTestingModule], // Añade HttpClientTestingModule
            providers: [UsuarioService] // Proporciona el servicio UsuarioService
        })
        .compileComponents();
        fixture = TestBed.createComponent(CrearJugadorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // Comprobamos que el componente existe
    it('Debe existir el componente', () => {
        expect(component).toBeTruthy();
    });

    //Comprobamos que el formulario se rellena completo. 
    it('Formulario de Crear Jugador debe estar completo',()=>{
        fixture.detectChanges()
        const form = component.jugadorForm
        const nombre = component.jugadorForm.controls['nombre']
        nombre.setValue('Pepito')
        expect(form.invalid).toBeTruthy()
    })
    
    //Formulario completo. Está bien
    it('Formulario esta completo',()=>{
        const form = component.jugadorForm

        const nombre = component.jugadorForm.controls['nombre']
        const puntos = component.jugadorForm.controls['puntos']
        const division = component.jugadorForm.controls['division']
        const usuario = component.jugadorForm.controls['usuario']
        const password = component.jugadorForm.controls['password']
        
        nombre.setValue('Ivansito')
        puntos.setValue(200)
        division.setValue(1)
        usuario.setValue('ijimqui')
        password.setValue('passw1')
        expect(form.valid).toBeTruthy()
    })
});
