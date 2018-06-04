import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Filter } from 'bbsrc-database';

import { HelpPopupComponent } from '../help-popup/help-popup.component';

@Component({
  selector: 'bbsrc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  filter: Partial<Filter> = {};
  filtersUpdating = false;
  openState = true;

  narrowWidth = window.innerWidth - 340;
  wideWidth = window.innerWidth;
  height = window.innerHeight - 110;
  containerHeight = window.innerHeight - 150;
  drawerWidth = window.innerWidth - window.innerWidth / 8;
  drawerHeight = window.innerHeight;

  scienceMapNodeSizeRange = [2, 18];

  constructor(private dialog: MatDialog) { }

  openHelp() {
    const dialogRef = this.dialog.open(HelpPopupComponent);
  }
}
