/**
 * @fileoverview CAPTCHA task configuration and image datasets.
 * @module config/mockData/captchaTask
 */

/**
 * Creates a CAPTCHA image entry.
 * @param {number} id - Image identifier
 * @param {string} url - Image URL
 * @returns {{id: number, url: string}} Image entry
 */
const createImage = (id, url) => ({ id, url });

/**
 * Creates a complete CAPTCHA challenge.
 * @param {number} id - Challenge identifier
 * @param {string} text - Challenge instruction text
 * @param {Array<string>} imageUrls - Array of image URLs
 * @param {Array<number>} correctIds - IDs of correct images
 * @returns {Object} CAPTCHA challenge definition
 */
const createChallenge = (id, text, imageUrls, correctIds) => ({
  id,
  text,
  images: imageUrls.map(createImage),
  correctIds
});

/** @type {Array<string>} Bicycle detection CAPTCHA images */
const bicycleImages = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi5CoYxgGKpzM3urXm2Ufe-6g6vKvUhS1oqA&s',
  'https://thebestbikelock.com/wp-content/uploads/2015/10/bikes-outside.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSYz9B4DaXFpvgkJyWMfPiEo_4dRJNfw8-mg&s',
  'https://vancouver.ca/images/cov/feature/three-people-riding-bikes-facebook.jpg',
  'https://static01.nyt.com/images/2011/05/29/automobiles/HOND-2/HOND-2-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
  'https://cdn-fastly.motorcycle.com/media/2023/04/13/11464660/motorcycle-beginner-2011-honda-cbr250r-newbie-review.jpg?size=720x845&nocrop=1',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2iaaFrElRhSv7su5iLL2Q_j-ajXQ4hbi1pA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQglZha-fp_uG0wtv05tJH6qmCnUsfLc_YTwg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLD9YP2j8jsk3cXST3_fio4VpDyIhX23U_Q&s'
];

/** @type {Array<string>} Beer selection CAPTCHA images */
const beerImages = [
  'https://citydrinks.gr/wp-content/uploads/2022/05/HEINEKEN-0-BEER-330.jpg',
  'https://www.thepackagingcompany.com/knowledge-sharing/wp-content/uploads/2018/02/ip_guiness_blog.jpg',
  'https://wave-grocery.s3.eu-central-1.amazonaws.com/thanopoulos/products/52100208_1_1_C380692EC4A75985ECCD21F2F6E66C0D.jpg',
  'https://citydrinks.gr/wp-content/uploads/2022/05/ALFA-BEER-500.jpg',
  'https://canava.gr/wp-content/uploads/2022/05/corona_1.jpg',
  'https://canava.gr/wp-content/uploads/2021/03/stella-artois-f2c4d2724438753a-600x600-1.png',
  'https://wave-grocery.s3.eu-central-1.amazonaws.com/thanopoulos/products/5201309108014_1_1_52C37EF0E081FCC1C392314CB3A77261.jpg',
  'https://www.tcmgourmet.com/21529-large_default/zagorka-33cl.jpg',
  'https://www.drinksupermarket.com/media/catalog/product/cache/8240349af4c6b2aac4dc703710c4a1d6/b/u/bud-light-beer-300ml_2.png'
];

/** @type {Array<string>} Traffic light detection CAPTCHA images */
const trafficLightImages = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoYlIk1dn2v98VHfZ6iy-xBdP_FgkgzHZeiQ&s',
  'https://globalhealthnow.org/sites/default/files/styles/max_650x650/public/images/2016-09/traffic%20light_0.jpg',
  'https://www.sellectronics.co.uk/wp-content/uploads/2024/06/Sellectronics-History-of-Traffic-Lights-Image.jpg',
  'https://image.smythstoys.com/original/800/desktop/242479.jpg',
  'https://www.yunextraffic.com/wp-content/uploads/2024/03/Ecolight-signal-heads-Yunex-Traffic.jpg',
  'https://www.ecoticias.com/en/wp-content/uploads/2024/12/four-color-traffic-lights-8750618_1280-750x422.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD2MZDkzwCmGBmJz5GBUiGdc4X_kuInynSvA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBDVNr2cfsIUvn4po7fLM7R9W3FZ2JStHjDA&s',
  'https://www.hss.ie/wp-content/uploads/2025/01/Mobile-Traffic-Light-3-Way-Battery.jpg'
];

/** @type {Array<string>} Bureaucrat detection CAPTCHA images */
const bureaucratImages = [
  'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTu-GSY_bXjggu92Go8I0Od4bEoIE-RnSuaCRmN5xcL4lfSDQI169Wyg5hK0VegSLUJjpqlG47veDZ33C0',
  'https://people.auth.gr/wp-content/uploads/2024/04/asymeonPhoto2020cropped-scaled.jpg',
  'https://t4.ftcdn.net/jpg/04/33/83/81/360_F_433838132_9U7VyzfhCXDKAFU4Z0wbBhiCWSeNnsQm.jpg',
  'https://i.pinimg.com/564x/ce/6e/e9/ce6ee9520cf7beaf4e9e63b6e972c039.jpg',
  'https://st.depositphotos.com/1269204/1219/i/450/depositphotos_12196477-stock-photo-smiling-men-isolated-on-the.jpg',
  'https://media.licdn.com/dms/image/v2/D4E03AQH03-SlW3oe8g/profile-displayphoto-crop_800_800/B4EZmRHESTKUAI-/0/1759076174770?e=1765411200&v=beta&t=RnULn76h-ahtWXAb-d_U850MA4HAm3rQHcjf-hnzYxs',
  'https://media.licdn.com/dms/image/v2/D4D03AQGlRvGUK3Hctg/profile-displayphoto-crop_800_800/B4DZltN7AaG8AI-/0/1758474001179?e=1765411200&v=beta&t=6NBp7uE-Zc_rSR-pwlsmgju7wNEkyu2mDhwXaa8Wpx0',
  'https://i.ytimg.com/vi/-jvUqzje0go/hqdefault.jpg?sqp=-oaymwExCOADEI4CSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYYSBhKGEwDw==&rs=AOn4CLC7DQzPasuUyRJ-Ta07yguCGGbjRw',
  'https://scontent-mxp2-1.xx.fbcdn.net/v/t39.30808-1/475946040_1203505604620899_656382886654255409_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=wsYPfw6cgw0Q7kNvwG6Xzg7&_nc_oc=AdkGoB7NKuQyFcw9lXYdGMrSpF7rKNzqENleFWDIWoMRHJ6hUEr3Jidvdirfe5ptyYo&_nc_zt=24&_nc_ht=scontent-mxp2-1.xx&_nc_gid=yF06zpnKUNnRAplxgoCjOQ&oh=00_AfiP7L3PI36OwTQthiPAuUanIFGfvHLtyzJkg7GAmLLtKg&oe=6927CB5E'
];

/** @type {Array<string>} Resume detection CAPTCHA images */
const resumeImages = [
  'https://www.my-resume-templates.com/wp-content/uploads/2023/07/job-resume-template-259.jpg',
  'https://www.resume.org/wp-content/uploads/2025/06/5108511-resume-example-for-students-with-no-experience.pdf.jpeg',
  'https://staticlearn.shine.com/l/m/images/blog/mobile/combinational%20resume%20format.webp',
  'https://amzirlodp-prd-s3.s3.amazonaws.com/documents/images/big_4cda85d892a5c0b5dd63b510a9c83e9c9d06e739.jpg',
  'https://cdn.prod.website-files.com/642dc708b5571b4f0877d529/65cee8ec26e52092bc1139c6_6510c02f89d03d0e8a8afcc6_649edf028ba700d268051864_legal%252520document%252520templates.jpeg',
  'https://thefusebase.com/wp-content/uploads/2023/05/Contractor-Agreement-791x1024.png',
  'https://www.smartsheet.com/sites/default/files/2024-10/IC-Basic-Document-Control-Template-Example.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSABZ4C7xMcwvNhdRuTUfCpDqqtvqvNeqtZBg&s',
  'https://upload.wikimedia.org/wikipedia/commons/a/a8/Mantelb%C3%B6gen.JPG'
];

/**
 * Available CAPTCHA challenges for the CAPTCHA task.
 * @type {Array<Object>}
 */
export const CAPTCHAs = [
  createChallenge(1, 'Select all images with BICYCLES', bicycleImages, [0, 1, 2, 3]),
  createChallenge(2, 'Select the BEST BEER', beerImages, [1]),
  createChallenge(3, 'Select all images with TRAFFIC LIGHTS', trafficLightImages, [0, 1, 2, 3, 4, 5, 6, 7, 8]),
  createChallenge(4, 'Select all BUREAUCRATS', bureaucratImages, [5, 6, 7, 8]),
  createChallenge(5, 'Select all images containing RESUME', resumeImages, [0, 1, 2])
];
