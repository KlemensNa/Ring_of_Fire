import { Component } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent {

  CardAnimation = false;
  currentCard: string = '';
  game: Game;                       //have to set strict in tsconfig.json to false

  constructor(public dialog: MatDialog) { };

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game)
  };

  pickCard() {
    if (!this.CardAnimation) {
      this.currentCard = this.game.stack.pop();             //take last Value of an Array and delete it#      
      this.CardAnimation = true;

      
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.CardAnimation = false;
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        console.log(this.game)
      }, 2000)
    }
  };

  pickNewCard() {

  }

  /**
   * function from Material Design Icon onclick. Opens MD-dialog window --> where the variable "name" is defined by an Input 
   */
  openDialog(): void {

    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {     
      if(name && name.length > 0){
        this.game.players.push(name);
      }      
    });
  }


}
