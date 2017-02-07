import { FS } from 'meteor/cfs:base-package';

const affinityStore = new FS.Store.GridFS('affinity');

export const Affinity = new FS.Collection('affinity', {
  stores: [affinityStore],
});
