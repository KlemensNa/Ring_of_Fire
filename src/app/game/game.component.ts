import { Component, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, collectionData, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { addDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent {

  CardAnimation = false;
  currentCard: string = '';
  item$: Observable <any[]>;
  game: Game;                       //have to set strict in tsconfig.json to false
  games;
  
  constructor(public route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) {};

  ngOnInit() {
    this.newGame();                                                                   
    this.route.params.subscribe((parames) => {                //ActivatedRoute --> route.params gibt parameter der Route aus, hier lasse ich mir die "id" ausloggen
      console.log(parames['id']);

      let gamo = doc(this.firestore, "games", parames['id']);
      onSnapshot(gamo, (game:any) => {
        console.log(game.data())
        this.game.currentPlayer = game.data().currentPlayer;
        this.game.playedCards = game.data().playedCards;
        this.game.players = game.data().players;
        this.game.stack = game.data().stack;
      })      
    }) 
  }

  // async addGame(game){
  //   await addDoc(this.getGamesRef(), game).catch(
  //     () => (err) => {console.error(err)
  //   }).then((gameinfo: any) => {
  //     console.log(gameinfo)
  //   } )
  // }

  newGame() {
    this.game = new Game();
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
