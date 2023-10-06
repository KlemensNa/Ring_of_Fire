import { Component } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent {

  CardAnimation = false;
  currentCard: string = '';
  game: Game;                       //have to set strict in tsconfig.json to false

  constructor() { };

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
      
      console.log(this.currentCard)
      this.CardAnimation = true;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.CardAnimation = false;
      }, 2000)
    }

    console.log(this.game)

  };

  pickNewCard() {

  }

}
