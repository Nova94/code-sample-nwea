import {SuitedCard} from './Card';

/*
* Player class
* desc: this base class models a player with a name and score
* */
export class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }

    playTurn() {
        return this.name + ' played their turn';
    }

    get wins() { return this.name + ' won the game' };
    get loses() { return this.name + ' loses the game'};

}


/*
* CardGamePlayer
* description: this class extends Player for card games by adding a hand and handLimit members
* along with a method like draw() returns card
* */
export class CardGamePlayer extends Player {
    constructor(name, handLimit) {
        super(name);
        this.handLimit = handLimit;
        this.hand = [];
    }

    playTurn() { return super.playTurn() }

    draw(card) {
        if(this.hand.length < this.handLimit) {
            this.hand.push(card);
        }
    }
}

/*
* WarCardGamePlayer class
* desc: this class is overrides playTurn() to remove the top card from their hand as in the card game War
* also overrides wins/loses to return conditions whether the player has won or lost.
* */

export class WarCardGamePlayer extends CardGamePlayer {
    constructor(name, handLimit) {
        super(name, handLimit);
    }

    playTurn() {
        let card = this.hand.shift();
        if (card !== undefined) {
            console.log(super.playTurn() + ': ' + card.value);
            ;return new SuitedCard(card.value, card.suit) }
        return null;
    }

    get wins() {
        return this.hand.length == this.handLimit
    }

    get loses() {
        return this.hand.length == 0
    }
}



