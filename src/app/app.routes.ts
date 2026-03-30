import { NovaTransferencia } from './pages/nova-transferencia/nova-transferencia';
import { Routes } from '@angular/router';
import { Transferencias } from './pages/transferencias/transferencias';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {path:'', component: Home},
  {path:'nova', component: NovaTransferencia},
  {path:'transferencias/:numeroConta', component: Transferencias},
];
