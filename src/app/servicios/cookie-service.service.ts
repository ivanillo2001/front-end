import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor(private router: Router) { }

  // Función para establecer una cookie
  setCookie(name: string, value: string) {
    document.cookie = name + "=" + value + ";path=/";
}

  // Función para obtener el valor de una cookie
  getCookie(name: string) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(cname) === 0) {
        return c.substring(cname.length, c.length);
      }
    }
    return "";
  }
  // Función para verificar si existe una cookie
cookieExists(name: string) {
  const decodedCookie = decodeURIComponent(document.cookie);
  return decodedCookie.includes(name + "=");
}

  // Función para eliminar una cookie
  deleteCookie(name: string) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}
