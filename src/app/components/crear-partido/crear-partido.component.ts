import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../servicios/usuario.service';
import { Jugador } from '../../modelos/jugador';
import { Pareja } from '../../modelos/pareja';
import Swal from 'sweetalert2';
import { CookieService } from '../../servicios/cookie-service.service';
@Component({
  selector: 'app-crear-partido',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './crear-partido.component.html',
  styleUrl: './crear-partido.component.css'
})
export class CrearPartidoComponent implements OnInit{
  cookie_service = inject(CookieService)
  partidoForm: FormGroup
  jugadores: Jugador[] = [];
  parejas : Pareja[]=[]
  pareja1!: Pareja
  pareja2!:Pareja
  division !:string
  private serviciosJugadores = inject(UsuarioService)
  constructor(private formBuilder: FormBuilder) {
    this.partidoForm = this.formBuilder.group({
      division: ['0', [Validators.required]],
      pareja1: ['0', [Validators.required]],
      pareja2: ['0', [Validators.required]],
      juegos1SetPareja1: [,[ Validators.required, Validators.min(0), Validators.max(7)]],
      juegos1SetPareja2: [,[ Validators.required, Validators.min(0), Validators.max(7)]],
      juegos2SetPareja1: [,[ Validators.required, Validators.min(0), Validators.max(7)]],
      juegos2SetPareja2: [,[ Validators.required, Validators.min(0), Validators.max(7)]],
      juegos3SetPareja1: [],
      juegos3SetPareja2: [],
      
    });
  }
  ngOnInit(): void {
    const selectDivision = document.querySelector('#division') as HTMLSelectElement;
    selectDivision.addEventListener('change', () => {
      this.division = selectDivision.value;
      this.cargarParejas(parseInt(this.division));
    });
    this.validar_lenguage()
  }  

  validar_lenguage(){
    let lenguage = this.cookie_service.getCookie('language')
    if (lenguage =='spanish'|| lenguage=='english'){
      return lenguage
    }else{
      return null
    }
  }

  cargarParejas(division:number){
    this.serviciosJugadores.obtenerParejasDivision(division).subscribe(
      (parejas:Pareja[])=>{
        this.parejas=parejas;
      }
    )
  }
  crearPartido() {
    if (this.partidoForm.valid) {
      let pareja1 = this.partidoForm.get('pareja1')!.value;
      let pareja2 = this.partidoForm.get('pareja2')!.value;
      let set1 = this.partidoForm.get('juegos1SetPareja1')!.value + ' - '+this.partidoForm.get('juegos1SetPareja2')!.value ;
      let set2 = this.partidoForm.get('juegos2SetPareja1')!.value + ' - '+this.partidoForm.get('juegos2SetPareja2')!.value ;
      let juegos3SetPareja1 = this.partidoForm.get('juegos3SetPareja1')?.value || 0;
      let juegos3SetPareja2 = this.partidoForm.get('juegos3SetPareja2')?.value || 0;
      let set3 = `${juegos3SetPareja1} - ${juegos3SetPareja2}`; 
      
      this.serviciosJugadores.crearPartido(parseInt(pareja1),parseInt(pareja2),set1,set2,set3,parseInt(this.division)).subscribe({
        next:(data) => {
          console.log('Partido creado con éxito:', data);
          Swal.fire({
            icon: "success",
            title: "Partido creado exitosamente",
            showConfirmButton: false,
            timer: 1500
          });
          this.partidoForm.reset()
        },
        error:(error) => {
          console.error('Error al crear partido:', error);
          Swal.fire({
            icon: "error",
            title: "No se ha podido crear el partido",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
    }else{
      Swal.fire({
        icon: "error",
        title: "No se ha podido crear el partido",
        text: "Revisa que todos los campos estén rellenos o los datos sean correctos",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}
