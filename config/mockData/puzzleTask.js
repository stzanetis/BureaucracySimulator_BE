/**
 * @fileoverview Puzzle task configuration and templates.
 * @module config/mockData/puzzleTask
 */

/**
 * Creates a puzzle template definition.
 * @param {string} puzzleKey - Unique puzzle identifier
 * @param {string} title - Display title
 * @param {string} question - Puzzle question text
 * @param {string} correctAnswer - Expected answer
 * @param {Object} [options] - Additional options (options array, sequence)
 * @returns {Object} Puzzle template definition
 */
const createPuzzleTemplate = (puzzleKey, title, question, correctAnswer, options = {}) => ({
  puzzleKey,
  title,
  question,
  correctAnswer,
  inputPlaceholder: options.inputPlaceholder || 'Type your answer...',
  ...options
});

/**
 * Available puzzle templates for the puzzle task.
 * @type {Array<Object>}
 */
export const puzzleTemplates = [
  createPuzzleTemplate(
    'glorpLogic',
    'Regulatory Logic Check',
    'If all Glorps are Zinks, and some Zinks are Flibs, can we conclude that some Glorps are Flibs?',
    'No',
    { options: ['Yes', 'No', 'Cannot be determined'] }
  ),
  createPuzzleTemplate(
    'exponentialSequence',
    'Sequential Integrity Pattern',
    'What comes next in this sequence?',
    'sixty four',
    { sequence: '2, 4, 8, 16, 32, ?' }
  ),
  createPuzzleTemplate(
    'russellBarber',
    'Analysis of the Grooming Compliance Mandate',
    'Imagine a town where, by law, every man must shave daily. But they don\'t have to shave themselves. ' +
      'For those who don\'t want to, the town has its barber. The law states exactly: "Whoever does not shave himself is shaved by the barber." ' +
      '\nSo then the question arises: \nWho shaves the barber?',
    'Russell'
  ),
  createPuzzleTemplate(
    'paradox',
    'Self-Referential Dilemma',
    'If the answer is neither A nor B, what is your answer?',
    'Neither',
    { options: ['A', 'B'], inputPlaceholder: 'Your answer...' }
  )
];
