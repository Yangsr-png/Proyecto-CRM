import { Component } from '@angular/core';

import { ClientesTableComponent } from './components/clientes-table/clientes-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
 imports: [ClientesTableComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent {}
