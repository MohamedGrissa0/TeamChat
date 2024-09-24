import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

// Define validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to navigate programmatically
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        setErrors({ serverError: error.message || 'Login failed' });
      } else {
        
        const result = await response.json();
        dispatch({ type: 'SET_USER', payload: result.user });
        navigate('/chat')
      }
    } catch (error) {
      setErrors({ serverError: 'Network error, please try again later' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='col-span-6 font-md rounded-md flex-col h-full w-full flex items-center justify-center'>
      <p>Welcome Back</p>

      {/* Formik Component */}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form className='flex flex-col space-y-9'>
            {/* Email Field */}
            <div>
              <Field
                type='email'
                name='email'
                placeholder='Email'
                className='bg-[#0F1F34] px-8 py-[6px] rounded-md'
              />
              <ErrorMessage
                name='email'
                component='div'
                className='text-red-500'
              />
            </div>

            {/* Password Field */}
            <div>
              <Field
                type='password'
                name='password'
                placeholder='Password'
                className='bg-[#0F1F34] px-8 py-[6px] rounded-md'
              />
              <ErrorMessage
                name='password'
                component='div'
                className='text-red-500'
              />
            </div>

            {/* Error Message for Server Side */}
            {errors.serverError && (
              <p className='text-red-500'>{errors.serverError}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-[#1E8BEC] p-2 rounded-md ${isSubmitting ? 'cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Loading...' : 'Sign in'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
