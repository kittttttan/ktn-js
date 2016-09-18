import {Component, OnInit} from '@angular/core';
import TestMathExpression from '../lib/math-expression';

@Component({
  selector: 'integer',
  templateUrl: 'html/result.component.html'
})
export class MathExpressionComponent implements OnInit {
  public out: string;

  public constructor() {
    
  }

  public ngOnInit() {
    this.out = TestMathExpression.main();
  }
}
