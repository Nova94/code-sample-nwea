
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


