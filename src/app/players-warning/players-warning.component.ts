import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-players-warning',
  templateUrl: './players-warning.component.html',
  styleUrls: ['./players-warning.component.scss']
})
export class PlayersWarningComponent {

  constructor(public dialogRef: MatDialogRef<PlayersWarningComponent>){

  }

}
