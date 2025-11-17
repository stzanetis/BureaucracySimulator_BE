import { DEFAULT_SONGLIST } from '../config/constants.js';

/**
 * Returns the list of song URLs for the start screen.
 *
 * @returns {Promise<string[]>}
 */
export const getSongList = async () => {
  // Simulate async operation
  await Promise.resolve();
  return DEFAULT_SONGLIST;
};
