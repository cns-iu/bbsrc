import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'bbsrc-results-panel',
  templateUrl: './results-panel.component.html',
  styleUrls: ['./results-panel.component.sass'],
  animations: [
    trigger('panelState', [
      state('inactive', style({
        display: 'none',
        bottom: '0px'
      })),
      state('active',   style({
        display: 'block',
        top: '484px'
      })),
      transition('inactive => active', animate('60ms ease-in')),
      transition('active => inactive', animate('60ms ease-out'))
    ]),
    trigger('buttonState', [
      state('inactive', style({
        bottom: '0px'
      })),
      state('active',   style({
        'top': '-248px'
      })),
      transition('inactive => active', animate('60ms ease-in')),
      transition('active => inactive', animate('60ms ease-out'))
    ])
  ]
})
export class ResultsPanelComponent implements OnInit {
  panelState = 'inactive';
  buttonState = 'inactive';

  constructor() { }

  ngOnInit() {
  }

  togglePanel() {
    this.panelState = this.panelState === 'active' ? 'inactive' : 'active';
    this.buttonState = this.buttonState === 'active' ? 'inactive' : 'active';
  }

}
