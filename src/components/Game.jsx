import React from 'react';
import {Button} from 'react-bootstrap';
import {WarCardGamePlayer} from '../models/Player';
import {Deck} from '../models/Deck';
import 'whatwg-fetch';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.players = [
            new WarCardGamePlayer('AI', 52),
            new WarCardGamePlayer('player 1', 52)
        ];
        this.setup();
    }

    setup() {
        let deck = new Deck();
        let players = this.players;

        //fetch a shuffled deck from the server
        fetch('/deck/suited/shuffled')
            .then(function (response) {
                return response.json()
            })
            .then(function (json) {
                deck.fromJSON(json);
                deck.deal(players, 52);
            })
            .catch(function (ex) {
                console.log('parsing failed', ex)
            });
    }

    war(initBattle) {

        let war = {
            ai: this.players[0],
            p1: this.players[1],
            cards: [initBattle.aiCard, initBattle.p1Card],
            aiCard: this.players[0].playTurn(),
            p1Card: this.players[1].playTurn()
        };

        while (war.aiCard.equals(war.p1Card)) {
            war.cards.push(war.aiCard, war.p1Card,
                war.ai.playTurn(), war.p1.playTurn()); // previous battle + facedown cards
            //play turns
            war.aiCard = war.ai.playTurn();
            war.p1Card = war.p1.playTurn();
        }

        //final battle added to cards
        war.cards.push(war.aiCard, war.p1Card);

        let winnerReceivesCards = (winner, cards) => {
            cards.map((card) => {
                winner.draw(card);
            })
        };

        if (war.aiCard.compare(war.p1Card) > 0) {
            console.log('ai won the war');
            winnerReceivesCards(war.ai, war.cards);
        }
        else {
            console.log('player 1 won the war');
            winnerReceivesCards(war.p1, war.cards);
        }


    }

    battle() {
        let battle = {
            ai: this.players[0],
            p1: this.players[1],
            aiCard: this.players[0].playTurn(),
            p1Card: this.players[1].playTurn()
        };

        if (battle.aiCard.equals(battle.p1Card)) {
            console.log('War declared');
            this.war(battle);
        }
        else if (battle.aiCard.compare(battle.p1Card) > 0) {
            console.log('ai won the battle');
            //add cards to ai's hand
            battle.ai.draw(battle.p1Card); battle.ai.draw(battle.aiCard);
        }
        else {
            console.log('player 1 won the battle');
            //add cards to player's hand
            battle.p1.draw(battle.aiCard); battle.p1.draw(battle.p1Card);
        }
    }

    play() {
        this.setup(); //run setup get a new deck and deal to players.
        do {
            console.log('----------------');
            this.battle();

        } while (!this.players[0].wins && !this.players[1].wins); //While no one has one keep battling.

        this.cleanup(); //cleanup game and announce winner

    }

    cleanup() {
        for (let p of this.players) {
            if (p.wins) {
                console.log(p.name + ' wins');
                p.score += 1;
            }
            else {
                console.log(p.name + ' loses')
            }
            p.hand = []; // reset hands
        }
        console.log('Scores: Ai= ' + this.players[0].score
            + ' player 1= ' + this.players[1].score)
    }

    render() {
        return (
            <div id="game">
                <h1>Card Game: War</h1>
                <p>please open your console to watch the game be played.</p>
                <Button bsStyle="success" onClick={this.play.bind(this)}>Play Game</Button>
            </div>
        )
    }
}
