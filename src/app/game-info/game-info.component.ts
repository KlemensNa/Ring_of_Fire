import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent {

  CardAction = [
    {title: "Ace is Waterfall", description: "Everyone should keep drinking until the person who picked the card stops. If you are only on voice, the person who pulled this card must say start when they start to drink and stop then they stop."},
    {title: "Two is You", description: "You can choose someone to drink."},
    {title: "Three is me", description: "You drink."},
    {title: "Four is...", description: "Well, female players drink."},
    {title: "Five is thumb master", description: "cover your webcam with your thumb whenever you want. The last person to do this must drink. If the player who pulls it isn't on webcam, they must drink."},
    {title: "Six is dicks", description: "All male players must drink."},
    {title: "Seven is heaven", description: "You can point to the sky, the last player who does this has to drink. If you aren't playing on web cam, say heaven at anytime, the last player to say it must drink."},
    {title: "Eight is mate", description: "Choose another player, they must drink whenever you do."},
    {title: "Nine is rhyme", description: "Think of a word, the next player (based on the turn list) must come up with a word to rhyme with this, go through the list. The first player who can't drink."},
    {title: "Ten is Categories", description: "Pick a category such as football and you go in a circle and everyone has to say a word that fits with football such as: goal, post, player. Whoever messes up, drinks."},
    {title: "Jack is make a rule", description: "You can make up any rule that everyone has to follow, such as you can only drink with your left hand. Everyone (including you) must follow this rule for the whole entire game and if you disobey you must drink."},
    {title: "Queen is question master", description: "Until someone next pulls this card, anyone who answers a question you ask must drink."},
    {title: "Well, a King", description: "This one is hard to do online, you must do a forfeit decided by the player with the turn before you."},
  ];

  title: string = '';
  description: string = '';

  @Input() card:string;

  constructor(){};

  ngOnChanges(){
    if(this.card){
      console.log('current card', this.card)
      let cardNumber =  +this.card.split('_')[1];
      this.title = this.CardAction[cardNumber - 1].title;
      this.description = this.CardAction[cardNumber - 1].description;
    }    
  }

}
