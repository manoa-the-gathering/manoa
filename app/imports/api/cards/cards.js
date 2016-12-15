import { FS } from 'meteor/cfs:base-package';
import { Meteor } from 'meteor/meteor';

const imageStore = new FS.Store.S3("images", {

    region: "us-west-2",
    /* REQUIRED */
    accessKeyId: "AKIAJAATVWG6RPUHCOSA",
    secretAccessKey:  "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",
    bucket: "manoa-the-gathering"
});

export const Images = new FS.Collection("Images", {
    stores: [imageStore],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});