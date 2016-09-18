import {Component} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ExamplesComponent} from './examples.component';
//import {IterComponent} from './iter.component';
import {IntegerComponent} from './integer.component';
import {MathExpressionComponent} from './math-expression.component';
import {RationalComponent} from './rational.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'examples',
    pathMatch: 'full'
  },
  {
    path: 'examples',
    component: ExamplesComponent
  },
  // {
  //   path: 'iter',
  //   component: IterComponent
  // },
  {
    path: 'integer',
    component: IntegerComponent
  },
  {
    path: 'math-expression',
    component: MathExpressionComponent
  },
  {
    path: 'rational',
    component: RationalComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
