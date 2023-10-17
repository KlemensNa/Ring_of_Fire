import { Component, OnInit, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent {

  constructor(private firestore: Firestore, private router: Router) { };    //public, wenn auch in HTML gewollt


  async newGame() {
    let game = new Game();
    let gameId: string;

    await addDoc(this.getGameRef(), game.gameToJSON())
      .catch(() => (err) => {console.error(err)})
      .then((gameinfo: any) => {gameId = gameinfo['id'];})

    this.router.navigateByUrl('/game/' + gameId)
  }



  getGameRef() {
    return collection(this.firestore, "games")
  }

}
