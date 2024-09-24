import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';

export default function Register() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Preview image
    }
  };

  // Yup validation schema
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  // Handle Register API Call
  const handleRegister = async (values, { setSubmitting, resetForm }) => {
    try {
      // Create FormData object to handle file upload and form data
      const formData = new FormData();
      formData.append('username', values.username);
      formData.append('email', values.email);
      formData.append('password', values.password);

      // Append the avatar (image file) if it's selected
      if (values.avatar) {
        formData.append('avatar', values.avatar);
      }

      // Make the POST request
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        body: formData, // Send FormData (includes the file)
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      toast.success('Registration successful');
      resetForm(); // Reset form after successful registration
    } catch (error) {
      toast.error('Error: ' + error.message);
      console.error('Error:', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="col-span-6 font-md rounded-md flex-col h-full w-full flex items-center justify-center">
      <p className="text-center mb-4 text-2xl">Create an Account</p>

      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          avatar: null, // New field to handle image upload
        }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="flex flex-col space-y-9">
            <div className="flex items-center space-x-4">
              {/* Display the selected image on the left */}
              <img
                src={selectedImage ? selectedImage : 'https://wpuploads.appadvice.com/wp-content/uploads/2014/10/facebookanon.jpg'}
                alt="Selected Avatar"
                className="w-16 h-16 object-cover bg-tra rounded-full border border-gray-300"
              />

              <div>
                <label htmlFor="avatar-upload" className="cursor-pointer text-blue-500 hover:underline">
                  Upload an avatar
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  className="hidden" // Hide the input element
                  accept="image/*" // Ensure only images are allowed
                  onChange={(e) => {
                    handleImageChange(e);
                    setFieldValue('avatar', e.target.files[0]); // Set the file in Formik state
                  }}
                />
              </div>
            </div>

            {/* Username Field */}
            <div>
              <Field
                name="username"
                type="text"
                placeholder="Username"
                className="bg-[#0F1F34] px-8 py-[6px] rounded-md"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Email Field */}
            <div>
              <Field
                name="email"
                type="text"
                placeholder="Email"
                className="bg-[#0F1F34] px-8 py-[6px] rounded-md"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Password Field */}
            <div>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="bg-[#0F1F34] px-8 py-[6px] rounded-md"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-[#1E8BEC] p-2 rounded-md"
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
