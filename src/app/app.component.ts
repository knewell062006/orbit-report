import { Component } from '@angular/core';
import { Satellite } from './satellite';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Orbit Report';
  displayList: Satellite[];
  sourceList: Satellite[];
  serverUrl: string = 'https://handlers.education.launchcode.org/static/satellites.json';
  constructor() {
    this.sourceList = [];
    this.displayList = [];
    window.fetch(this.serverUrl).then(function(response) {
      response.json().then(function(data) {
        let satellites = data.satellites;
        for(let i=0; i < satellites.length; i++) {
          let satellite = new Satellite(satellites[i].name, satellites[i].type, satellites[i].launchDate, satellites[i].orbitType, satellites[i].operational);
          this.sourceList.push(satellite);
        }
        // make a copy of the sourceList to be shown to the user
        this.displayList = this.sourceList.slice(0);
      }.bind(this));
    }.bind(this));
  }
  search(searchTerm: string): void {
    let matchingSatellites: Satellite[] = [];
    searchTerm = searchTerm.toLocaleLowerCase();
    for(let i=0; i < this.sourceList.length; i++) {
      let name = this.sourceList[i].name.toLocaleLowerCase();
      if (name.includes(searchTerm)) {
        matchingSatellites.push(this.sourceList[i]);
      }
    }
    // update satellites to be only the matching satellites
    this.displayList = matchingSatellites;
  }
}