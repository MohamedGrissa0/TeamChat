import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Setting() {
  const user = useSelector((state) => state.user);
  const [selectedImage, setSelectedImage] = useState(null);

  // Preview the image when selected
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Preview image
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string(),
    email: Yup.string().email('Invalid email format'),
    password: Yup.string().min(6, 'Password must be at least 6 characters'),
  });

  const handleUpdate = async (values, { setSubmitting, resetForm }) => {
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
  
      // Make the PUT request
      const response = await axios.put(`http://localhost:5000/api/user/${user._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
  
      if (response.status !== 200) {
        throw new Error('Update failed');
      }
  
      // Store the updated user info in localStorage (replacing the old one)
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      toast.success('Update successful');
      resetForm(); // Reset form after successful update
    } catch (error) {
      toast.error('Error: ' + error.message);
      console.error('Error:', error.message);
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <div className="container mx-auto w-full h-screen rounded-md flex justify-center items-center relative">
      <div className="absolute inset-0 rounded-md bg-[#354A5F] my-[50.5px]"></div>
      <div className="relative z-10 rounded-md w-full py-10 h-full text-white text-4xl">
        <div className="col-span-6 font-md rounded-md flex-col h-full w-full flex items-center justify-center">
          <p className="text-center mb-4 text-2xl">Update Profile</p>

          <Formik
            initialValues={{
              username: user?.username || '',
              email: user?.email || '',
              password: '',
              avatar: null, // New field to handle image upload
            }}
            validationSchema={validationSchema}
            onSubmit={handleUpdate}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form className="flex flex-col space-y-9">
                <div className="flex items-center space-x-4">
                  {/* Display the selected image on the left */}
                  <img
                    src={selectedImage ? selectedImage : `http://localhost:5000/api/${user?.avatar}`}
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
                      accept="image/*"
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
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Email Field */}
                <div>
                  <Field
                    name="email"
                    type="text"
                    placeholder="Email"
                    className="bg-[#0F1F34] px-8 py-[6px] rounded-md"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Password Field */}
                <div>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="bg-[#0F1F34] px-8 py-[6px] rounded-md"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>

                <button
                  type="submit"
                  className="bg-[#1E8BEC] p-2 rounded-md"
                  disabled={isSubmitting} // Disable button while submitting
                >
                  {isSubmitting ? 'Updating...' : 'Update'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
