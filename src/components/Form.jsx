import React, { useState } from "react";
import { Field, Formik } from "formik";
import validationSchema from "./yup";


const Form = () => {
    const [submitStatus, setSubmitStatus] = useState(false);
    const clientId = process.env.REACT_APP_CLIENTID;
    const clientSecret = process.env.REACT_APP_CLIENTSECRET;
    const refreshTokenValue = process.env.REACT_APP_REFRESHTOKENVALUE;
    const spreadsheetId = process.env.REACT_APP_SPREADSHEETID;
    const range = process.env.REACT_APP_RANGE;
    const valueInputOption = process.env.REACT_APP_VALUEINPUTOPTION;
    const initialValues = {
        name: "",
        email: "",
        phone: "",
        message: "",
    };

    const refreshToken = async () => {
        const url = `https://oauth2.googleapis.com/token`;
        const requestBody = {
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: "https://developers.google.com/oauthplayground",
            refresh_token: refreshTokenValue,
            grant_type: "refresh_token",
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error('Failed to refresh access token');
            }

            const responseData = await response.json();
            const newAccessToken = responseData.access_token;
            return newAccessToken;
        } catch (error) {
            console.error('Error refreshing access token:', error);
            throw error;
        }
    };

    const appendData = async (accessToken) => {
        try {
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=${valueInputOption}`;
            const form = document.querySelector("#form");

            const formData = new FormData(form);

            const values = [Object.values(Object.fromEntries(formData.entries()))];

            const requestBody = {
                majorDimension: "ROWS",
                values,
            };

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });
            if (response.ok) {
                setSubmitStatus(true);
                setTimeout(() => {
                    setSubmitStatus(false);
                }, 5000);
            }
            const finalRes = await response.json();
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    const handleFormSubmit = async (values, res) => {
        try {
            const accessToken = await refreshToken();
            await appendData(accessToken);


        } catch (error) {
            console.error("Error: ", error);
        }
    }
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={async (values) => {
            handleFormSubmit(values);

        }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => (

                <div className="w-full items-center justify-center flex flex-col mt-16">

                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-16 mr-4 ml-4 md:w-1/2 flex flex-col h-full " id="form">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold-700 mb-2" for="name">
                                Name
                            </label>
                            <Field className="shadow appearance-none border rounded-lg border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" name="name" placeholder="Enter your name" />
                            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold-700 mb-2" for="email">
                                E-Mail
                            </label>
                            <Field className="shadow appearance-none border border-red-500 rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" name="email" placeholder="Enter your e-mail" />
                            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold-700 mb-2" for="phone">
                                Phone
                            </label>
                            <Field className="shadow appearance-none border border-red-500 rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" name="phone" pattern="[0-9]*" placeholder="Enter your Phone Number" />
                            {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold-700 mb-2" for="message">
                                Message
                            </label>
                            <textarea
                                className="shadow appearance-none border border-red-500 rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border-black p-2 w-full" id="message" type="text" name="message" placeholder="Enter message" onChange={handleChange} onBlur={handleBlur} value={values.message} />
                            {errors.message && <p className="text-red-500 text-xs italic">{errors.message}</p>}
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Submit
                            </button>


                        </div>
                    </form>
                    {submitStatus && <div className="flex items-center justify-center border-rounded">
                        <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                        <div>
                            <p class="font-bold">Great!</p>
                            <p class="text-sm">Form is submitted</p>
                        </div>
                    </div>}
                </div>
            )}
        </Formik >
    )
}



export default Form;