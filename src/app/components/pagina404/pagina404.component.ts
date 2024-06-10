import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-pagina404',
  standalone: true,
  imports: [],
  templateUrl: './pagina404.component.html',
  styles: ``
})
export class Pagina404Component {
  constructor(private location: Location) { }
  goBack(): void {
    this.location.back();
  }
}
