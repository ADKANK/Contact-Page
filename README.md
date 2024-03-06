# Contact App Documentation

This documentation provides instructions for setting up and using the Contact app, a React application designed to manage and submit contact form data efficiently.

## 1. Cloning the Project:

- Clone the Contact app repository from GitHub:
   ```bash
    git clone <repository_url>
    cd Contact-Page

## 2. Installing Dependencies:

- Navigate to the project directory and install necessary dependencies including Formik, Yup, and dotenv:
   ```bash
    npm install formik yup dotenv

## 3. Integrating Formik and Yup:

- Import Formik and Yup into your React components.
- Define the initial form values and validation schema using Yup.
- Wrap your form with the `<Formik>` component, passing in the initial values, validation schema, and submit handler.

## 4. Form Validation with Yup:

- Define validation rules using Yup schema validation.
- Specify validation rules for each form field such as required fields, format checks, and maximum lengths.

## 5. Handling Form Submission:

- Implement an asynchronous submit handler function that sends the form data to Google Sheets.
- Use the Fetch API to make a POST request to the Google Sheets API endpoint with the form data.
- Include the OAuth 2.0 Access Token in the request headers for authentication.

## 6. Using dotenv for Environment Variables:

- Create a `.env.local` file in the root of your project.
- Add your environment variables, such as API keys or tokens, in the `.env.local` file.
- Access these environment variables in your code using `process.env`.

## 7. Sending Data to Google Sheets:

- Replace `'REACT_APP_CLIENTID'` with the 0Auth 2.0 Client IDs
- Replace `'REACT_APP_CLIENTSECRET'` with the 0Auth 2.0 Client IDs Secret
- Replace `'REACT_APP_REFRESHTOKENVALUE'` with the API Refresh Token Value
- Replace `'REACT_APP_SPREADSHEETID'` with the Spreadsheet ID
- Replace `'REACT_APP_RANGE'` with the Sheet Range (for example : "Sheet1!A2:D" )
- Replace `'REACT_APP_VALUEINPUTOPTION'` with the Value Input Option (for example : "USER_ENTERED")


## 8. Testing and Deployment:

- Test the app locally to ensure proper functionality and validation.
- Deploy the app to your desired hosting platform for production use.
- Monitor form submissions and error handling in the deployed environment.

## 9. Security Considerations:

- Securely handle and store OAuth 2.0 Access Token and other sensitive information.
- Implement proper error handling to handle any failures during form submission.
- Regularly review and update the app's security measures to protect against potential vulnerabilities.

By following this documentation, you can create a Contact app that efficiently manages and submits contact form data, integrates with Google Sheets for data storage, and ensures security and reliability.
