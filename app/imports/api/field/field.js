import { FS } from 'meteor/cfs:base-package';

const fieldStore = new FS.Store.GridFS('field');

export const Field = new FS.Collection('field', {
  stores: [fieldStore],
});
