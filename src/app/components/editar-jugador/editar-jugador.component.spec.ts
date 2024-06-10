import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarJugadorComponent } from './editar-jugador.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa este módulo
import { UsuarioService } from '../../servicios/usuario.service';
describe('Test para Componente de EditarJugador', () => {
  let component: EditarJugadorComponent;
  let fixture: ComponentFixture<EditarJugadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarJugadorComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [UsuarioService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe existir el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario de nombre relleno',()=>{
    fixture.detectChanges()
    const form = component.jugadorForm
    const nombre = form.controls['nombreJugador']
    nombre.setValue('Valor')
    expect(form.valid).toBeTruthy()
  })
  it('Formulario de nombre debe estar relleno',()=>{
    fixture.detectChanges()
    const form = component.jugadorForm
    const nombre = form.controls['nombreJugador']
    nombre.setValue('')
    expect(form.invalid).toBeTruthy()
  })

  it('Formulario de edición debe estar relleno completo',()=>{
    fixture.detectChanges()
    const form = component.editarForm
    const nombre = form.controls['nombre_jugador']
    nombre.setValue('Pepe')
    expect(form.invalid).toBeTruthy()
  })
  it('Formulario de edición relleno completo',()=>{
    fixture.detectChanges()
    const form = component.editarForm
    const nombre = form.controls['nombre_jugador']
    nombre.setValue('Pepe')
    const puntos = form.controls['puntos_jugador']
    puntos.setValue(250)
    const division = form.controls['division_jugador']
    division.setValue(1)
    const rol = form.controls['rol_jugador']
    rol.setValue('jugador')
    expect(form.valid).toBeTruthy()
  })

});
