import {Random} from 'meteor/random';

export class Deck {

    constructor(cards) {
        this.cards = cards; //an array of cards
    }

    deal() {

        const hand = this.cards.slice(this.cards.length-7, this.cards.length);
        this.cards = this.cards.slice(0, this.cards.length-7);
       // console.log(hand);
        // console.log(this.cards);
        return hand;
    }

    shuffle() {

        for (let i = this.cards.length - 1; i > 0; i--) {

            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;

        }

        //console.log(this.cards);
    }

    draw() {
        let card = this.cards.pop()
        //console.log(card);
        this.cards.pop()
        //console.log(this.cards);
        return card;
    }
}