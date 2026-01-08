export const leaderboard = [
  { name: 'Kafka Enjoyer', score: 235 },
  { name: 'Paper Pusher', score: 657 },
  { name: 'Form A23 Survivor', score: 132 }
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
  { id: 9, taskType: 'COFFEE', completed: false, pageName: 'coffee-task' }
];

/**
 * Payment portal state for Coffee Task (task id 9).
 */
export const coffeePaymentState = {
  paymentAccepted: false
};

export const chatbotMessages = [
  {
    id: 1,
    text: 'Welcome to the Department of Needless Complexity. We hope you brought snacks.'
  },
  {
    id: 2,
    text: 'Your application has been received and immediately lost. Don\'t worry, we\'ll find it... eventually.'
  },
  {
    id: 3,
    text: 'Did you really think this would be quick? How adorable.'
  },
  {
    id: 4,
    text: 'Spoiler alert: You\'re already behind schedule.'
  }
];

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
export const CAPTCHAs = [
  {
    id: 1,
    text: 'Select all images with BICYCLES',
    images: [
      { id: 0, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi5CoYxgGKpzM3urXm2Ufe-6g6vKvUhS1oqA&s' },
      { id: 1, url: 'https://thebestbikelock.com/wp-content/uploads/2015/10/bikes-outside.jpg' },
      { id: 2, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSYz9B4DaXFpvgkJyWMfPiEo_4dRJNfw8-mg&s' },
      { id: 3, url: 'https://vancouver.ca/images/cov/feature/three-people-riding-bikes-facebook.jpg' },
      { id: 4, url: 'https://static01.nyt.com/images/2011/05/29/automobiles/HOND-2/HOND-2-articleLarge.jpg?quality=75&auto=webp&disable=upscale' },
      { id: 5, url: 'https://cdn-fastly.motorcycle.com/media/2023/04/13/11464660/motorcycle-beginner-2011-honda-cbr250r-newbie-review.jpg?size=720x845&nocrop=1' },
      { id: 6, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2iaaFrElRhSv7su5iLL2Q_j-ajXQ4hbi1pA&s' },
      { id: 7, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQglZha-fp_uG0wtv05tJH6qmCnUsfLc_YTwg&s' },
      { id: 8, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLD9YP2j8jsk3cXST3_fio4VpDyIhX23U_Q&s' }
    ],
    correctIds: [0, 1, 2, 3]
  },
  {
    id: 2,
    text: 'Select the BEST BEER',
    images: [
      { id: 0, url: 'https://citydrinks.gr/wp-content/uploads/2022/05/HEINEKEN-0-BEER-330.jpg' },
      { id: 1, url: 'https://www.thepackagingcompany.com/knowledge-sharing/wp-content/uploads/2018/02/ip_guiness_blog.jpg' },
      { id: 2, url: 'https://wave-grocery.s3.eu-central-1.amazonaws.com/thanopoulos/products/52100208_1_1_C380692EC4A75985ECCD21F2F6E66C0D.jpg' },
      { id: 3, url: 'https://citydrinks.gr/wp-content/uploads/2022/05/ALFA-BEER-500.jpg' },
      { id: 4, url: 'https://canava.gr/wp-content/uploads/2022/05/corona_1.jpg' },
      { id: 5, url: 'https://canava.gr/wp-content/uploads/2021/03/stella-artois-f2c4d2724438753a-600x600-1.png' },
      { id: 6, url: 'https://wave-grocery.s3.eu-central-1.amazonaws.com/thanopoulos/products/5201309108014_1_1_52C37EF0E081FCC1C392314CB3A77261.jpg' },
      { id: 7, url: 'https://www.tcmgourmet.com/21529-large_default/zagorka-33cl.jpg' },
      { id: 8, url: 'https://www.drinksupermarket.com/media/catalog/product/cache/8240349af4c6b2aac4dc703710c4a1d6/b/u/bud-light-beer-300ml_2.png' }
    ],
    correctIds: [1]
  },
  {
    id: 3,
    text: 'Select all images with TRAFFIC LIGHTS',
    images: [
      { id: 0, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoYlIk1dn2v98VHfZ6iy-xBdP_FgkgzHZeiQ&s' },
      { id: 1, url: 'https://globalhealthnow.org/sites/default/files/styles/max_650x650/public/images/2016-09/traffic%20light_0.jpg' },
      { id: 2, url: 'https://www.sellectronics.co.uk/wp-content/uploads/2024/06/Sellectronics-History-of-Traffic-Lights-Image.jpg' },
      { id: 3, url: 'https://image.smythstoys.com/original/800/desktop/242479.jpg' },
      { id: 4, url: 'https://www.yunextraffic.com/wp-content/uploads/2024/03/Ecolight-signal-heads-Yunex-Traffic.jpg' },
      { id: 5, url: 'https://www.ecoticias.com/en/wp-content/uploads/2024/12/four-color-traffic-lights-8750618_1280-750x422.jpg' },
      { id: 6, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD2MZDkzwCmGBmJz5GBUiGdc4X_kuInynSvA&s' },
      { id: 7, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBDVNr2cfsIUvn4po7fLM7R9W3FZ2JStHjDA&s' },
      { id: 8, url: 'https://www.hss.ie/wp-content/uploads/2025/01/Mobile-Traffic-Light-3-Way-Battery.jpg' }
    ],
    correctIds: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  },
  {
    id: 4,
    text: 'Select all BUREAUCRATS',
    images: [
      { id: 0, url: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTu-GSY_bXjggu92Go8I0Od4bEoIE-RnSuaCRmN5xcL4lfSDQI169Wyg5hK0VegSLUJjpqlG47veDZ33C0' },
      { id: 1, url: 'https://people.auth.gr/wp-content/uploads/2024/04/asymeonPhoto2020cropped-scaled.jpg' },
      { id: 2, url: 'https://t4.ftcdn.net/jpg/04/33/83/81/360_F_433838132_9U7VyzfhCXDKAFU4Z0wbBhiCWSeNnsQm.jpg' },
      { id: 3, url: 'https://i.pinimg.com/564x/ce/6e/e9/ce6ee9520cf7beaf4e9e63b6e972c039.jpg' },
      { id: 4, url: 'https://st.depositphotos.com/1269204/1219/i/450/depositphotos_12196477-stock-photo-smiling-men-isolated-on-the.jpg' },
      { id: 5, url: 'https://media.licdn.com/dms/image/v2/D4E03AQH03-SlW3oe8g/profile-displayphoto-crop_800_800/B4EZmRHESTKUAI-/0/1759076174770?e=1765411200&v=beta&t=RnULn76h-ahtWXAb-d_U850MA4HAm3rQHcjf-hnzYxs' },
      { id: 6, url: 'https://media.licdn.com/dms/image/v2/D4D03AQGlRvGUK3Hctg/profile-displayphoto-crop_800_800/B4DZltN7AaG8AI-/0/1758474001179?e=1765411200&v=beta&t=6NBp7uE-Zc_rSR-pwlsmgju7wNEkyu2mDhwXaa8Wpx0' },
      { id: 7, url: 'https://i.ytimg.com/vi/-jvUqzje0go/hqdefault.jpg?sqp=-oaymwExCOADEI4CSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYYSBhKGEwDw==&rs=AOn4CLC7DQzPasuUyRJ-Ta07yguCGGbjRw' },
      { id: 8, url: 'https://scontent-mxp2-1.xx.fbcdn.net/v/t39.30808-1/475946040_1203505604620899_656382886654255409_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=wsYPfw6cgw0Q7kNvwG6Xzg7&_nc_oc=AdkGoB7NKuQyFcw9lXYdGMrSpF7rKNzqENleFWDIWoMRHJ6hUEr3Jidvdirfe5ptyYo&_nc_zt=24&_nc_ht=scontent-mxp2-1.xx&_nc_gid=yF06zpnKUNnRAplxgoCjOQ&oh=00_AfiP7L3PI36OwTQthiPAuUanIFGfvHLtyzJkg7GAmLLtKg&oe=6927CB5E' }
    ],
    correctIds: [5, 6, 7, 8]
  },
  {
    id: 5,
    text: 'Select all images containing RESUME',
    images: [
      { id: 0, url: 'https://www.my-resume-templates.com/wp-content/uploads/2023/07/job-resume-template-259.jpg' },
      { id: 1, url: 'https://www.resume.org/wp-content/uploads/2025/06/5108511-resume-example-for-students-with-no-experience.pdf.jpeg' },
      { id: 2, url: 'https://staticlearn.shine.com/l/m/images/blog/mobile/combinational%20resume%20format.webp' },
      { id: 3, url: 'https://amzirlodp-prd-s3.s3.amazonaws.com/documents/images/big_4cda85d892a5c0b5dd63b510a9c83e9c9d06e739.jpg' },
      { id: 4, url: 'https://cdn.prod.website-files.com/642dc708b5571b4f0877d529/65cee8ec26e52092bc1139c6_6510c02f89d03d0e8a8afcc6_649edf028ba700d268051864_legal%252520document%252520templates.jpeg' },
      { id: 5, url: 'https://thefusebase.com/wp-content/uploads/2023/05/Contractor-Agreement-791x1024.png' },
      { id: 6, url: 'https://www.smartsheet.com/sites/default/files/2024-10/IC-Basic-Document-Control-Template-Example.png' },
      { id: 7, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSABZ4C7xMcwvNhdRuTUfCpDqqtvqvNeqtZBg&s' },
      { id: 8, url: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Mantelb%C3%B6gen.JPG' }
    ],
    correctIds: [0, 1, 2]
  }
]