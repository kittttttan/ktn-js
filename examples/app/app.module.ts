import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {routing} from './app.routing';

import {AppComponent} from './app.component';
import {ExamplesComponent} from './examples.component';
//import {IterComponent} from './iter.component';
import {IntegerComponent} from './integer.component';
import {MathExpressionComponent} from './math-expression.component';
import {RationalComponent} from './rational.component';

@NgModule({
  imports: [
    BrowserModule,
    routing
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    IntegerComponent,
    MathExpressionComponent,
    RationalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
