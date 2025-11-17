/**
 * Simple in-memory mock data store.
 * This is reset every time the server restarts (GDPR-friendly, no persistence).
 */

export const leaderboard = [
  { name: 'Kafka Enjoyer', score: 420 },
  { name: 'Paper Pusher', score: 666 },
  { name: 'Form A23 Survivor', score: 999 }
];

export const users = [];

/**
 * To-do tasks and departments are associated by departmentName/pageName.
 * IDs are numeric and stable to match the OpenAPI specification.
 */
export const departments = [
  { id: 1, name: 'Secretary of Bored and Shady Individuals', pageName: 'puzzle-task' },
  { id: 2, name: 'Department of Unreadable Forms', pageName: 'form-task' },
  { id: 3, name: 'CAPTCHA Complaints Unit', pageName: 'captcha-task' },
  { id: 4, name: 'Secretariat of Drowsiness', pageName: 'coffee-task' },
  { id: 5, name: 'Serious Headquarters of Seriousness', pageName: 'signature-task' },
  { id: 6, name: 'Unjustified Audit Office', pageName: 'display-task' }
];

/**
 * Global pool of task templates. Actual user tasks are clones of these.
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
  // ID 9 is reserved for the Coffee Task payment portal per OpenAPI spec
  { id: 9, taskType: 'COFFEE', completed: false, pageName: 'coffee-task' },
  { id: 10, taskType: 'MISC', completed: false, pageName: 'misc-task' }
];

/**
 * Payment portal state for Coffee Task (task id 9).
 */
export const coffeePaymentState = {
  paymentAccepted: false
};
