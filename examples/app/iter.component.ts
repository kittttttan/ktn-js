import {Component, OnInit} from '@angular/core';
import TestIter from '../lib/iter';

@Component({
  selector: 'integer',
  templateUrl: 'html/result.component.html'
})
export class IterComponent implements OnInit {
  public out: string;

  public constructor() {
    
  }

  public ngOnInit() {
    this.out = TestIter.main();
  }
}
