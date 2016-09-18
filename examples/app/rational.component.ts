import {Component, OnInit} from '@angular/core';
import TestRational from '../lib/rational';

@Component({
  selector: 'integer',
  templateUrl: 'html/result.component.html'
})
export class RationalComponent implements OnInit {
  public out: string;

  public constructor() {
    
  }

  public ngOnInit() {
    this.out = TestRational.main();
  }
}
