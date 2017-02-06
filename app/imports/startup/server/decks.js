import { Meteor } from 'meteor/meteor';
import { Affinity } from '../../api/affinity/affinity.js';
import { Naya } from '../../api/naya/naya.js';
import { _ } from 'meteor/underscore';
import { FS } from 'meteor/cfs:base-package';

Affinity.allow({
  'download'() {
    // add custom authentication code here
    return true;
  },
});

Affinity.deny({
  'insert'() {
    return false;
  },
  'update'() {
    return false;
  },
  'remove'() {
    return false;
  },
});

Naya.allow({
  'download'() {
    // add custom authentication code here
    return true;
  },
});

Naya.deny({
  'insert'() {
    return false;
  },
  'update'() {
    return false;
  },
  'remove'() {
    return false;
  },
});

// Create deck collections in mongodb, fill cards in them

if (Naya.find().count() === 0) {
  let newFile = new FS.File();
  newFile.attachData(Assets.absoluteFilePath('glass.png'), function (error) {
    if (error) throw error;
    newFile.metadata = { card: 'land' };
    Naya.insert(newFile);
  });
}

Meteor.publish('naya', function () {
  return Naya.find();
});
