import {shuffle} from 'underscore';

export class Deck {
    constructor() {
        this._cards = [];
        this.shuffled = false;
    }

    get empty() { return this._cards.length == 0 };

    shuffle() {
        if(!this.shuffled) {
            this._cards = shuffle(this._cards);
            this.shuffled = true;
        }
    }
    

    deal(players, numOfCardsPerHand){
        if(this.shuffled) {
            for(let i = 0; i < numOfCardsPerHand; ++i) {
                players.map((player) => {
                    let dealtCard = this._cards.shift();

                    if(dealtCard) { player.draw(dealtCard) }
                })
            }
            this.shuffled = false;
        }
    }
    
    addToBottom(...cards) { return cards.map((card) => this._cards.push(card)) }
    removeFromTop() { return this._cards.shift() }

    toJSON() { return JSON.stringify({ _cards: this._cards, shuffled: this.shuffled}); }

    fromJSON(data) {
        Object.assign(this, data);
        console.log(this)
    }
}


