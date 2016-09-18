import {assert} from 'chai';
import {Card, SuitedCard} from '../models/Card';

describe("Card(s)", () => {
    beforeEach(() => {});
    afterEach(() => {});
    it('should be instantiated with a value', () => {
        let seven = new Card(7);

        assert.isObject(seven, 'card is an object');
        assert.deepEqual(seven, new Card(7), 'seven is equal to a card with value 7');
    });

    it('should compare cards', () => {
        let six = new Card(6);
        let seven = new Card(7);
        let eight = new Card(8);

        assert(seven.compare(new Card(7)) == 0, 'compare should return zero on equal cards');
        assert(six.compare(seven) == -1, 'compare should return -1');
        assert(eight.compare(seven) == 1, 'compare should return 1');
    });

    it('should return true on equals for equal values', () => {
        assert.isTrue(new Card(7).equals(new Card(7)), 'equals will return true on equal cards');
        assert.isFalse(new Card(8).equals(new Card(7)), 'equals will return false on un-equal cards');
    });

    it('should create classes from json and return JSON', () => {
        let json = new Card(7).toJSON();
        assert.strictEqual(json, '{"value":7}', 'returns object JSON');
        let card = new Card();
        card.fromJSON(JSON.parse(json));
        assert(card.equals(new Card(7)), 'creates card from JSON');
    });

    it('should have suited cards', () => {
        let suitedCard = new SuitedCard(8, 'spade');
        let json = new SuitedCard(7, 'diamond').toJSON();
        let card = new SuitedCard();
        assert.isTrue(suitedCard.equals(new SuitedCard(8, 'hearts')));
        assert.isFalse(suitedCard.equals(new SuitedCard(3,'clubs')));

        assert.equal(suitedCard.getSuit(), 'spade', 'returns suit');
        assert.strictEqual(json, '{"value":7,"suit":"diamond"}');
        
        card.fromJSON(JSON.parse(json));
        console.log(card);
        assert(card.equals(new SuitedCard(7, 'diamond')), 'creates suitedCard from JSON')
    })
});