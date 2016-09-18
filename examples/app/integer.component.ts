import {Component, OnInit} from '@angular/core';
import TestInteger from '../lib/integer';

@Component({
  selector: 'integer',
  templateUrl: 'html/result.component.html'
})
export class IntegerComponent implements OnInit {
  public out: string;

  public constructor() {
    
  }

  public ngOnInit() {
    this.out = TestInteger.main();
  }
}
