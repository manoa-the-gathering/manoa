import { FS } from 'meteor/cfs:base-package';

const nayaStore = new FS.Store.GridFS('naya');

export const Naya = new FS.Collection('naya', {
  stores: [nayaStore],
});
