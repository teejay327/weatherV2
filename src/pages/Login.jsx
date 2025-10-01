import { useState } from 'react';
import { useForm } from '../components/shared/hooks/form-hook.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/shared/hooks/use-auth.jsx';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import Card from '../components/UI/Elements/Card.jsx';
import Input from '../../src/components/shared/FormElements/Input.jsx';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../components/shared/util/validators.js';

const Login = () => {

  const [formState, inputHandler] = useForm(
    {
      email: { value: '', isValid: false },
      password: { value: '', isValid: false  }
    },
    false
  );

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  }

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log('LOGIN FORM DATA:', formState.inputs);

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Checking token
      console.log('Login response data', data);
      
      login(data.token);
      toast.success('Welcome back!');

      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch(err) {
      console.error('Login failed:', err.message);
      toast.error('Login failed, please try again');
    }
  }

  return (
    <Card className="bg-gray-900 p-6 max-w-md mx-auto mt-10 text-white">
      <h2 className="text-xl text-stone-200 mb-2">Login required</h2>
      <hr className="border-stone-600 mb-4"/>
      <form onSubmit={ submitHandler } className="space-y-4">
        <Input 
           id="email" 
           element="input" 
           type="email" 
           label="Email" 
           validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
           errorText="Please enter a valid email address" 
           onInput={ inputHandler } 
           placeholder="yourname@example.com"
        />

         <Input 
           id="password" 
           element="input" 
           type={ showPassword ? 'text' : 'password' } 
           label="Password" 
           validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
           errorText="Please enter a valid password" 
           onInput={ inputHandler } 
           placeholder="************"
        />

        <button
          type="button"
          onClick={ togglePassword }
          className="text-sm text-blue-400 hover:underline mt-1"
        >
          { showPassword ? 'Hide Password' : 'Show password'}
        </button>

        <button type="submit" 
           disabled={!formState.isValid} 
           className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 
            text-white rounded disabled:opacity-50">
          Login
        </button>

        <p className="text-sm text-stone-300 mt-4">
          don't have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            sign up here
          </a>
        </p>
      </form>
    </Card >
  );
};

export default Login;