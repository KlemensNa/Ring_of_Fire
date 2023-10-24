import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrls: ['./player-mobile.component.scss']
})
export class PlayerMobileComponent {
   /**
   * Input-Variable, din die in game-component.html wert gegeben wurde
   * kann in player.component html hinzugefügt werden
   */
   @Input() name;
   @Input() image;
   @Input() playerActive: boolean = false;
}
