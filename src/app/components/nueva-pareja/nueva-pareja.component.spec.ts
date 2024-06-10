import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevaParejaComponent } from './nueva-pareja.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa este módulo
import { UsuarioService } from '../../servicios/usuario.service';
describe('Test del componente para crear una nueva pareja', () => {
    let component: NuevaParejaComponent;
    let fixture: ComponentFixture<NuevaParejaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NuevaParejaComponent, ReactiveFormsModule, HttpClientTestingModule],
            providers: [UsuarioService]
        })
        .compileComponents();
        fixture = TestBed.createComponent(NuevaParejaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Debe existir el componente', () => {
        expect(component).toBeTruthy();
    });

    // FORMULARIO DE LA DIVISION
    it('Formulario de división debe seleccionar una division válida',()=>{
        fixture.detectChanges()
        const formulario = component.divisionForm
        const division = formulario.controls['division']
        division.setValue(0)
        expect(formulario.invalid).toBeTruthy()
    })
    it('Formulario de división está relleno correctamente',()=>{
        fixture.detectChanges()
        const formulario = component.divisionForm
        const division = formulario.controls['division']
        division.setValue(1)
        expect(formulario.valid).toBeTruthy()
    })

    // FORMULARIO DE JUGADORES
    it('Formulario de selección de jugador debe seleccionar un jugador correcto',()=>{
        fixture.detectChanges()
        const formulario = component.parejaForm
        const jugador1 = formulario.controls['jugador1']
        const jugador2 = formulario.controls['jugador2']
        jugador1.setValue(0)
        expect(formulario.invalid).toBeTruthy()
    })
    it('Formulario de seleccion de jugadores relleno correctamente',()=>{
        fixture.detectChanges()
        const formulario = component.parejaForm
        const jugador1 = formulario.controls['jugador1']
        const jugador2 = formulario.controls['jugador2']
        jugador1.setValue(1)
        jugador2.setValue(2)
        expect(formulario.valid).toBeTruthy()
    })
})