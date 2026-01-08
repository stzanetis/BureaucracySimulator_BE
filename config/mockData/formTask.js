/**
 * @fileoverview Form task configuration and templates.
 * @module config/mockData/formTask
 */

/**
 * Creates a form field definition.
 * @param {string} name - Field identifier
 * @param {string} label - Display label
 * @param {string} type - Input type (text, date, select, textarea)
 * @param {boolean} required - Whether field is required
 * @param {Object} [options] - Additional options (placeholder, options array)
 * @returns {Object} Form field definition
 */
const createFormField = (name, label, type, required, options = {}) => ({
  name,
  label,
  type,
  required,
  ...options
});

/**
 * Form template for the Official Form 27B-6.
 * @type {{title: string, description: string, fields: Array<Object>}}
 */
export const formTemplate = {
  title: 'Official Form 27B-6',
  description: 'Please complete this form with accurate information.',
  fields: [
    createFormField('fullName', 'Full Legal Name', 'text', true, {
      placeholder: 'First Middle Last'
    }),
    createFormField('idNumber', 'Identification Number', 'text', true, {
      placeholder: '000-000-0000'
    }),
    createFormField('dateOfBirth', 'Date of Birth', 'date', true),
    createFormField('purpose', 'Purpose of Request', 'select', true, {
      options: [
        'Personal Use',
        'Business Use',
        'Official Use',
        'Other (Please specify in Signature)'
      ]
    }),
    createFormField('address', 'Residential Address', 'text', true, {
      placeholder: 'Street, City, State, ZIP'
    }),
    createFormField('signature', 'Signature (Type your name)', 'textarea', true, {
      placeholder: 'Your signature'
    })
  ]
};
