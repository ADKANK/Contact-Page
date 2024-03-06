import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().matches(/^[a-zA-Z]+$/, "Name is not valid").required("Name is required"),
    email: Yup.string().email("Email is not valid").matches(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/, "Invalid email").required("Email is required"),
    phone: Yup.string().matches(/^[0-9]+$/, 'Phone must contain only numeric characters').matches(/^[0-9]+$/, "Phone is not valid").max(10, "Phone Number can be of max 10 digits").required("Phone is required"),
    message: Yup.string().max(160, "Message should contain max 160 characters").required("Message is required"),
});

export default validationSchema;