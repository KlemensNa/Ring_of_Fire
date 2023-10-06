import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent{

  constructor(private router: Router){};    //public, wenn auch in HTML gewollt

  
  newGame(){
    //startGame
    this.router.navigateByUrl('/game')
  }

}
