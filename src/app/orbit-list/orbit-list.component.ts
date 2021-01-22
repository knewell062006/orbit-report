import { Component, OnInit, Input } from '@angular/core';
import { Satellite } from '../satellite';
@Component({
  selector: 'app-orbit-list',
  templateUrl: './orbit-list.component.html',
  styleUrls: ['./orbit-list.component.css']
})
export class OrbitListComponent implements OnInit {
  @Input() satellites: Satellite[];
  constructor() { }
  ngOnInit() {
  }
  sort(column: string): void {
    // sort modifies the array, sorting the items based on the given sorting function
    // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description
    this.satellites.sort(function(a: Satellite, b: Satellite): number {
      if(a[column] < b[column]) {
        return -1;
      } else if (a[column] > b[column]) {
        return 1;
      }
      return 0;
    });
  }
}