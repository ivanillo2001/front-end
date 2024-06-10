import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Usuario } from '../modelos/usuario';
import { Division } from '../modelos/divisiones';
import { Jugador } from '../modelos/jugador';
import { Pareja } from '../modelos/pareja';
import { Partido } from '../modelos/partidos';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = "http://localhost:3000"
  private http = inject(HttpClient)
  
  //validar usuario
  validarUsuario(user: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/usuario`, { user, password }).pipe(
      map((response: any) => {
        if (response.valido === true) {
          // Si las credenciales son válidas, devolvemos un objeto que contiene el valor booleano "valido" y el rol del usuario
          return { valido: true, rol: response.rol };
        } else {
          // Si las credenciales no son válidas, devolvemos solo un objeto que indica que las credenciales son inválidas
          return { valido: false };
        }
      })
    );
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url+"/usuarios");
  }

  obtenerJugador(nombre:string):Observable<Jugador[]>{
    return this.http.post<Jugador[]>(this.url+"/jugadores/obtenerJugador",{nombre});
  }
  cargarPareja(idJugador:number):Observable<Pareja>{
    return this.http.post<Pareja>(this.url+"/jugadores/cargarPareja",{idJugador});
  }
  eliminarJugador(idJugador:number){
    return this.http.post(this.url+'/jugadores/eliminarJugador',{idJugador})
  }
  modificarPareja(idJugador1:number, idJugador2:number){
    return this.http.post(this.url+'/jugadores/modificarPareja',{idJugador1,idJugador2})
  }
  crearPareja(idJugador1:number, idJugador2:number,division:number, nombre_jugador1:string, nombre_jugador2:string){
    return this.http.post(this.url+'/jugadores/crearPareja',{idJugador1,idJugador2, division, nombre_jugador1,nombre_jugador2})
  }
  crearPartido(pareja1:number,pareja2:number,set1:string,set2:string,set3:string, division:number){
    return this.http.post(this.url+'/partidos/crearPartido',{pareja1,pareja2,set1,set2,set3,division})
  }
  obtenerDivisiones(): Observable<Division[]> {
    return this.http.get<Division[]>(this.url+"/divisiones");
  }

  crearJugador(nombre:string,puntos:number,division:number, usuario:string,password:string, imagen:string){
    return this.http.post(this.url+"/jugadores/crearJugador",{nombre,puntos,division,usuario,password,imagen});
  }

  editarJugador(idJugador:number, nombre:string, puntos:number, division:number, rol:string){
    return this.http.post(this.url+"/jugadores/editarJugador",{idJugador,nombre,puntos,division,rol});
  }

  jugadoresPrimera(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(this.url+"/jugadores/primeraDivision");
  }
  jugadoresSegunda(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(this.url+"/jugadores/segundaDivision");
  }
  obtenerParejasDivision(division:number):Observable<Pareja[]>{
    return this.http.post<Pareja[]>(this.url+"/divisiones/parejas",{division})
  }

  obtenerPartidos(division:number):Observable<Partido[]>{
    return this.http.post<Partido[]>(this.url+"/partidos/mostrarPartidos",{division})
  }
  obtenerJugadoresParejas(idPareja:number):Observable<Pareja[]>{
    return this.http.post<Pareja[]>(this.url+"/parejas/jugadoresParejas",{idPareja})
  }
}
