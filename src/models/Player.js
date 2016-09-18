
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
            return null;
        }

        return card;
    }
}

export class WarCardGamePlayer extends CardGamePlayer {
    constructor(name, handLimit) {
        super(name, handLimit);
    }

    playTurn() {
        console.log(super.playTurn());
        return this.hand.shift();
    }

    get wins() {
        console.log(super.wins);
        return this.hand.length == this.handLimit
    }

    get loses() {
        console.log(super.loses);
        return this.hand.length == 0
    }
}



