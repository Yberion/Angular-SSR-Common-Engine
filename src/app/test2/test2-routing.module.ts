import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Test2Component } from './test2.component';

const routes: Routes = [{ path: '', component: Test2Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Test2RoutingModule {}
