import { ABOUT_US_TEXT } from '../config/constants.js';

/**
 * Retrieve About Us text.
 *
 * @returns {Promise<string>}
 */
export const getAboutUsText = async () => {
  await Promise.resolve();
  return ABOUT_US_TEXT;
};
