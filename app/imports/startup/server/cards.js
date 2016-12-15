import { FS } from 'meteor/cfs:base-package';
import { Meteor } from 'meteor/meteor';

const ImageStore = new FS.Store.S3("images", {
    accessKeyId: Meteor.settings.AWSAccessKeyId,
    secretAccessKey: Meteor.settings.AWSSecretAccessKey,
    bucket: Meteor.settings.AWSBucket
});

export const NayaBurn = new FS.Collection("NayaBurn", {
    stores: [ImageStore],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});