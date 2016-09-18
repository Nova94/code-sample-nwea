import {assert} from 'chai';
import {Player, CardGamePlayer, WarCardGamePlayer} from '../models/Player';
import {Card, SuitedCard} from '../models/Card';

describe("Player(s) Test Suite", () => {
    let player;
    let cardGamePlayer;
    let warPlayer;

    beforeEach(() => {
        "use strict";
        player = new Player('player 1');
        cardGamePlayer = new CardGamePlayer('card_player 1', 7);
        warPlayer = new WarCardGamePlayer('war_player 1', 52);
    });
    afterEach(() => {});
    it('should set score to 0 and player name', () => {
        assert.strictEqual(player.name, "player 1");
        assert.equal(player.score, 0);
    });

    it('should set score to 0, hand, hand limit, and player name', () => {
        assert.strictEqual(cardGamePlayer.name, "card_player 1");
        assert.equal(cardGamePlayer.score, 0);
        assert.deepEqual(cardGamePlayer.hand, []);
        assert.equal(cardGamePlayer.handLimit, 7);
    });

    it('should draw cards', () => {
        cardGamePlayer.draw(new Card(1));

        assert.equal(cardGamePlayer.hand.length, 1);
        assert.deepEqual(cardGamePlayer.hand, [new Card(1)]);
    });

    it('should not draw cards at hand limit', () => {
        for(let i of [1,2,3,4,5,6,7,8,9,10])
            cardGamePlayer.draw(new Card(i));


        assert.equal(cardGamePlayer.hand.length, 7);
        assert.deepEqual(cardGamePlayer.hand,
            [new Card(1),new Card(2),new Card(3),new Card(4),new Card(5),new Card(6),new Card(7)]);
    });

    it('should play turn', () => {
        warPlayer.draw(new SuitedCard(3, 'hearts'));
        warPlayer.draw(new SuitedCard(4, 'hearts'));
        
        assert.deepEqual(warPlayer.playTurn(), new SuitedCard(3, 'hearts'));
        assert.deepEqual(warPlayer.playTurn(), new SuitedCard(4, 'hearts'));


    });

    it('should win', () => {
        for(let i of [...Array(52).keys()]) {
            warPlayer.draw(new Card(i));
        }

        assert.isTrue(warPlayer.wins);
        assert.isFalse(warPlayer.loses);
    });

    it('should lose', () => {
        assert.isTrue(warPlayer.loses);
        assert.isFalse(warPlayer.wins);
    });


});