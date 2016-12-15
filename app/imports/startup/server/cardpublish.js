import { Meteor } from 'meteor/meteor';
import { Images } from '../../api/cards/cards.js'

Meteor.publish('images', function() {
    return Images.find({sort: {createdAt: -1}, limit: 5});

});