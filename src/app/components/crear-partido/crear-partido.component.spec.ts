import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPartidoComponent } from './crear-partido.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsuarioService } from '../../servicios/usuario.service';

describe('Test de Crear Partido', () => {
    let component: CrearPartidoComponent;
    let fixture: ComponentFixture<CrearPartidoComponent>;

beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [CrearPartidoComponent, ReactiveFormsModule, HttpClientTestingModule],
        providers: [UsuarioService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
});

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    //Si no se rellena por completo debe devolver error
    it('Rellenar todo el formulario',()=>{
        fixture.detectChanges()
        const form = component.partidoForm
        const pareja1 = form.controls['pareja1']
        pareja1.setValue('Lebron - Paquito')
        expect(form.invalid).toBeTruthy()
    })

    it('Formulario crear partido completo',()=>{
        fixture.detectChanges()
        const form = component.partidoForm
        const division = form.controls['division']
        const pareja1 = form.controls['pareja1']
        const pareja2 = form.controls['pareja2']
        const juegos1SetPareja1 = form.controls['juegos1SetPareja1']
        const juegos1SetPareja2 = form.controls['juegos1SetPareja2']
        const juegos2SetPareja1 = form.controls['juegos2SetPareja1']
        const juegos2SetPareja2 = form.controls['juegos2SetPareja2']
        division.setValue(1)
        pareja1.setValue('Lebron - Paquito')
        pareja2.setValue('Tapia - Coello')
        juegos1SetPareja1.setValue(6)
        juegos1SetPareja2.setValue(0)
        juegos2SetPareja1.setValue(6)
        juegos2SetPareja2.setValue(0)
        expect(form.valid).toBeTruthy()
    })

    it('Formulario crear partido completo con datos incorrectos',()=>{
        fixture.detectChanges()
        const form = component.partidoForm
        const division = form.controls['division']
        const pareja1 = form.controls['pareja1']
        const pareja2 = form.controls['pareja2']
        const juegos1SetPareja1 = form.controls['juegos1SetPareja1']
        const juegos1SetPareja2 = form.controls['juegos1SetPareja2']
        const juegos2SetPareja1 = form.controls['juegos2SetPareja1']
        const juegos2SetPareja2 = form.controls['juegos2SetPareja2']
        division.setValue(1)
        pareja1.setValue('Lebron - Paquito')
        pareja2.setValue('Tapia - Coello')
        juegos1SetPareja1.setValue(8)
        juegos1SetPareja2.setValue(-2)
        juegos2SetPareja1.setValue(16)
        juegos2SetPareja2.setValue(5)
        expect(form.invalid).toBeTruthy()
    })
});
