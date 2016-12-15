import { FS } from 'meteor/cfs:base-package';
import { Meteor } from 'meteor/meteor';

export const Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path: "~/naya"})]
});

Images.allow({
    insert: function() { return true; },
    update: function() { return true; },
    download: function() { return true; }

});
