import { NovaTransferencia } from './pages/nova-transferencia/nova-transferencia';
import { Routes } from '@angular/router';
import { Transferencias } from './pages/transferencias/transferencias';

export const routes: Routes = [
  {path:'', component: NovaTransferencia},
  {path:'nova', component: NovaTransferencia},
  {path:'transferencias', component: Transferencias},
];
