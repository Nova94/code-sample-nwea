
/*
* Card class
* description: abstract class used to model a card which has some value
* */
export class Card {
    constructor(value) {
        this.value = value;
    }

    equals(to_cmp) {
        return to_cmp.value == this.value;
    }

    compare(to_cmp) {
        return this.value - to_cmp.value;
    }

    toJSON() {
        return JSON.stringify({value: this.value});
    }

    fromJSON(data) {
        Object.assign(this, data);
    }
}

/*
* SuitedCard class
* desc: implementation of a card with a suit and a value
* reason: broke up class Card and SuitedCard so that
* other cards could also be used later for different games (hanafuda, magic, etc...)
 */
export class SuitedCard extends Card {
    constructor(value, suit) {
        super(value);
        this.suit = suit;
    }

    getSuit() { return this.suit };

    toJSON() {
        return JSON.stringify({value: this.value, suit: this.suit});
    }
}


