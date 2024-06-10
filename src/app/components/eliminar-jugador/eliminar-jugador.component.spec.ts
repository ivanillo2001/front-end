import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarJugadorComponent } from './eliminar-jugador.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa este módulo
import { UsuarioService } from '../../servicios/usuario.service';
describe('EliminarJugadorComponent', () => {
    let component: EliminarJugadorComponent;
    let fixture: ComponentFixture<EliminarJugadorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EliminarJugadorComponent, ReactiveFormsModule, HttpClientTestingModule],
            providers: [UsuarioService]
        })
        .compileComponents();
        fixture = TestBed.createComponent(EliminarJugadorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Debe existir el componente', () => {
        expect(component).toBeTruthy();
    });

    it('Formulario de nombre debe estar relleno',()=>{
        fixture.detectChanges()
        const formulario = component.jugadorForm
        const nombre = formulario.controls['nombreJugador']
        nombre.setValue('')
        expect(formulario.invalid).toBeTruthy()
    })
    it('Formulario de nombre completamente relleno',()=>{
        fixture.detectChanges()
        const formulario = component.jugadorForm
        const nombre = formulario.controls['nombreJugador']
        nombre.setValue('Pepito')
        expect(formulario.valid).toBeTruthy()
    })
    
})