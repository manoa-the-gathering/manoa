import { Meteor } from 'meteor/meteor';
import {greenLp, blueLp} from  '../../api/lp/lp.js';


Meteor.methods() ({
    'greenplus': function() {
        greenLp += 1;
        console.log(greenLp);
    }
})