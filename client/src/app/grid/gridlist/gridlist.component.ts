import { Component, Input, OnInit } from '@angular/core';
import { GridConfig } from '../gridtypes/grid-config';

@Component({
  selector: 'app-gridlist',
  templateUrl: './gridlist.component.html',
  styleUrls: ['./gridlist.component.scss']
})
export class GridlistComponent implements OnInit {

  @Input() config : GridConfig | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
