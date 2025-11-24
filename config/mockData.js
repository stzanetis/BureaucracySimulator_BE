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
  { id: 1, name: 'Substantiation and Justification Sector', pageName: 'puzzle-task' },
  { id: 2, name: 'Department of Verification and Validation', pageName: 'form-task' },
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

/**
 * FORM TASK:
 * Form templates.
 */
export const formTemplate = {
  title: "Official Form 27B-6",
  description: "Please complete this form with accurate information.",
  fields: [
    {
      name: "fullName",
      label: "Full Legal Name",
      type: "text",
      placeholder: "First Middle Last",
      required: true,
    },
    {
      name: "idNumber",
      label: "Identification Number",
      type: "text",
      placeholder: "000-000-0000",
      required: true,
    },
    {
      name: "dateOfBirth",
      label: "Date of Birth",
      type: "date",
      required: true,
    },
    {
      name: "purpose",
      label: "Purpose of Request",
      type: "select",
      required: true,
      options: [
        "Personal Use",
        "Business Use",
        "Official Use",
        "Other (Please specify in Signature)",
      ],
    },
    {
      name: "address",
      label: "Residential Address",
      type: "text",
      placeholder: "Street, City, State, ZIP",
      required: true,
    },
    {
      name: "signature",
      label: "Signature (Type your name)",
      type: "textarea",
      placeholder: "Your signature",
      required: true,
    }
  ]
};

/** PUZZLE TASK:
 * Puzzle templates.
 */
export const puzzleTemplates = [
  {
    puzzleKey: "glorpLogic",
    title: "Regulatory Logic Check",
    question:
      "If all Glorps are Zinks, and some Zinks are Flibs, can we conclude that some Glorps are Flibs?",
    options: ["Yes", "No", "Cannot be determined"],
    correctAnswer: "No",
    inputPlaceholder: "Type your answer..."
  },
  {
    puzzleKey: "exponentialSequence",
    title: "Sequential Integrity Pattern",
    question: "What comes next in this sequence?",
    sequence: "2, 4, 8, 16, 32, ?",
    correctAnswer: "sixty four",
    inputPlaceholder: "Type your answer..."
  },
  {
    puzzleKey: "russellBarber",
    title: "Analysis of the Grooming Compliance Mandate",
    question:
      "Imagine a town where, by law, every man must shave daily. But they don’t have to shave themselves. " + 
      "For those who don’t want to, the town has its barber. The law states exactly: \b\“Whoever does not shave himself is shaved by the barber.”\b\ " +
      "\n\So then the question arises: \nWho shaves the barber?",
    correctAnswer: "Russell",
    inputPlaceholder: "Type your answer..."
  },
  {
    puzzleKey: "paradox",
    title: "Self-Referential Dilemma",
    question: "If the answer is neither A nor B, what is your answer?",
    options: ["A", "B"],
    correctAnswer: "Neither",
    inputPlaceholder: "Your answer..."
  },
];