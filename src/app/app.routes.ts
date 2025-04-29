import { Routes } from '@angular/router';
import { EquiposComponent } from './pages/equipos/equipos.component';
import { ArbitrosComponent } from './pages/arbitros/arbitros.component';
import { JugadoresComponent } from './pages/jugadores/jugadores.component';

export const routes: Routes = [
    { path: '', component: EquiposComponent }, // Puedes poner aquí tu home temporal
    { path: 'equipos', component: EquiposComponent },
    { path: 'jugadores', component: JugadoresComponent },
    { path: 'arbitros', component: ArbitrosComponent },
];
