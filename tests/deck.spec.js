import {assert, expect} from 'chai';
import {Deck} from '../models/Deck';
import {Card} from '../models/Card';
import {CardGamePlayer} from '../models/Player'

describe("Deck", () => {
    let deck;
    let players;

    beforeEach(() => {
        deck = new Deck();
        deck.addToBottom(new Card(1), new Card(2), new Card(3));
        players = [new CardGamePlayer('player1', 7), new CardGamePlayer('player2', 7)]
    });
    afterEach(() => {
    });

    it('should instantiate empty and not shuffled', () => {
        let newDeck = new Deck();
        assert.isTrue(newDeck.empty);
        assert.isFalse(newDeck.shuffled)
    });

    it('should add cards to the bottom', () => {
        let added = new Deck();
        added._cards = [new Card(1), new Card(2), new Card(3)];
        assert.deepEqual(deck, added)
    }); //

    it('should be shuffled', () => {
        deck.shuffle();
        assert.isTrue(deck.shuffled);
        assert.notDeepEqual(deck, new Deck(new Card(1), new Card(2), new Card(3)));
    });

    it('should be remove from top', () => {
        assert.deepEqual(deck.removeFromTop(), new Card(1));
        deck.addToBottom(new Card(4));
        assert.deepEqual(deck.removeFromTop(), new Card(2));
        assert.deepEqual(deck.removeFromTop(), new Card(3));
        assert.deepEqual(deck.removeFromTop(), new Card(4));

    });

    it('should return JSON', () => {
        assert.strictEqual(deck.toJSON(), "{\"_cards\":[\"{\\\"value\\\":1}\",\"{\\\"value\\\":2}\",\"{\\\"value\\\":3}\"],\"shuffled\":false}");
    });

    it('should deal the cards to players if shuffled', () => {
        deck.addToBottom(new Card(4), new Card(5), new Card(6), new Card(7),
            new Card(8), new Card(9), new Card(10), new Card(11),
            new Card(12), new Card(13), new Card(14));

        deck.shuffle();
        assert.isTrue(deck.shuffled);

        deck.deal(players, 7);
        assert.equal(players[0].hand.length, 7);
        assert.equal(players[1].hand.length, 7);
    })

    it('should not deal the cards to players if not shuffled', () => {
        assert.isFalse(deck.shuffled);
        deck.deal(players, 7);
        assert.isFalse(deck.empty);
        assert.equal(players[0].hand.length, 0);
        assert.equal(players[1].hand.length, 0);
    })

});