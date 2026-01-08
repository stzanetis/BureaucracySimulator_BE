/**
 * @fileoverview Department and task template definitions.
 * @module config/mockData/departments
 */

/**
 * Game departments with their associated task pages.
 * IDs are numeric and stable to match the OpenAPI specification.
 * @type {Array<{id: number, name: string, pageName: string}>}
 */
export const departments = [
  { id: 1, name: 'Substantiation and Justification Sector', pageName: 'puzzle-task' },
  { id: 2, name: 'Department of Verification and Validation', pageName: 'form-task' },
  { id: 3, name: 'CAPTCHA Complaints Unit', pageName: 'captcha-task' },
  { id: 4, name: 'Secretariat of Drowsiness', pageName: 'coffee-task' },
  { id: 5, name: 'Serious Headquarters of Seriousness', pageName: 'signature-task' },
  { id: 6, name: 'Unjustified Audit Office', pageName: 'display-task' }
];

/**
 * Global pool of task templates. Actual user tasks are cloned from these.
 * @type {Array<{id: number, taskType: string, completed: boolean, pageName: string}>}
 */
export const taskTemplates = [
  { id: 1, taskType: 'CAPTCHA', completed: false, pageName: 'captcha-task' },
  { id: 2, taskType: 'FORM', completed: false, pageName: 'form-task' },
  { id: 3, taskType: 'PUZZLE', completed: false, pageName: 'puzzle-task' },
  { id: 4, taskType: 'CAPTCHA', completed: false, pageName: 'captcha-task' },
  { id: 5, taskType: 'FORM', completed: false, pageName: 'form-task' },
  { id: 6, taskType: 'PUZZLE', completed: false, pageName: 'puzzle-task' },
  { id: 7, taskType: 'DISPLAY', completed: false, pageName: 'display-task' },
  { id: 8, taskType: 'SIGNATURE', completed: false, pageName: 'signature-task' },
  { id: 9, taskType: 'COFFEE', completed: false, pageName: 'coffee-task' }
];

/**
 * Payment portal state for Coffee Task (task id 9).
 * @type {{paymentAccepted: boolean}}
 */
export const coffeePaymentState = {
  paymentAccepted: false
};

/**
 * Satirical chatbot messages displayed during gameplay.
 * @type {Array<{id: number, text: string}>}
 */
export const chatbotMessages = [
  {
    id: 1,
    text: 'Welcome to the Department of Needless Complexity. We hope you brought snacks.'
  },
  {
    id: 2,
    text: "Your application has been received and immediately lost. Don't worry, we'll find it... eventually."
  },
  {
    id: 3,
    text: "Did you really think this would be quick? How adorable."
  },
  {
    id: 4,
    text: "Spoiler alert: You're already behind schedule."
  }
];
