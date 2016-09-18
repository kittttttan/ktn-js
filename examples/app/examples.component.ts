import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'examples',
  templateUrl: 'html/examples.component.html'
})
export class ExamplesComponent implements OnInit {
  public pages: string[];

  constructor(private _router: Router) {

  }

  public ngOnInit() {
    // TODO
    this.pages = [
	    //'iter',
      'integer',
      'math-expression',
      'rational',
    ];
  }

}
