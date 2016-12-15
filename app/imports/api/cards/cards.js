import { FS } from 'meteor/cfs:base-package';

export const NayaBurn = new FS.Collection("nayaburn", {
    stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});