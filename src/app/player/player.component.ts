import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  /**
   * Input-Variable, din die in game-component.html wert gegeben wurde
   * kann in player.component html hinzugefügt werden
   */
  @Input() name;
  @Input() image;
  @Input() playerActive: boolean = false;

}
