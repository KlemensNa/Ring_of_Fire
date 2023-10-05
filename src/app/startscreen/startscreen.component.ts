import { Component } from '@angular/core';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent {

  constructor(public router: Router){};

  
  newGame(){
    //startGame
    this.router.navigateByUrl('/game')
  }

}
