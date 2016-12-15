import { Meteor } from 'meteor/meteor';
import { Images } from '../../api/cards/cards.js'

Meteor.publish('images', function(limit) {
    check(limit, Number);

    return Images.find({}, {
        limit: limit
    });
});