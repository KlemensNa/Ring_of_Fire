import { Component, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, collectionData, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { addDoc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { PlayersWarningComponent } from '../players-warning/players-warning.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent {

  game: Game;                       //have to set strict in tsconfig.json to false
  games;
  gameID;
  gameOver: boolean = false;

  constructor(public route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { };

  ngOnInit() {
    this.newGame();                                           // die Seite besitzt die ID, weil sie im startscreen aufgerufen wird                    
    this.route.params.subscribe((parames) => {                //  ActivatedRoute --> route.params gibt parameter der Route aus, hier lasse ich mir die "id" ausloggen
      this.gameID = parames['id'];
      let gamo = doc(this.firestore, "games", parames['id']); // getRef of actual game

      onSnapshot(gamo, (game: any) => {                        // erstelle Snapshot für Abruf/ zum abhören des Dokuments
        this.game.currentPlayer = game.data().currentPlayer;
        this.game.playedCards = game.data().playedCards;
        this.game.players = game.data().players;
        this.game.stack = game.data().stack;
        this.game.CardAnimation = game.data().CardAnimation;
        this.game.currentCard = game.data().currentCard;
        this.game.playerImages = game.data().playerImages;
      })
    })
  }

  newGame() {
    this.game = new Game();
  };

  async pickCard() {
    if(this.game.stack.length == 0){
      this.gameOver = true;
    }
    else if (!this.game.CardAnimation && this.game.players.length > 0) {
      this.game.currentCard = this.game.stack.pop();             //take last Value of an Array and delete it#       
      this.game.CardAnimation = true;
      this.saveGame();


      setTimeout(() => {

        this.game.playedCards.push(this.game.currentCard);
        this.game.CardAnimation = false;
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.saveGame();
      }, 2000);
    } else {
      this.playersWarning()
    }
  };

  playersWarning(){
    
    const dialogRef = this.dialog.open(PlayersWarningComponent);

    
  }

  editPlayer(id) {
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if(change == "DELETE"){
          this.game.players.splice(id, 1);
        } else{          
          this.game.playerImages[id] = change;
          this.saveGame();
        }
        
      }
    });
  }


  /**
   * function from Material Design Icon onclick. Opens MD-dialog window --> where the variable "name" is defined by an Input 
   */
  openDialog(): void {

    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.playerImages.push('default.png')
        this.saveGame();
      }
    });
  }

  async saveGame() {
    let game = doc(this.firestore, "games", this.gameID);
    await updateDoc(game, this.game.gameToJSON());
  }


}
