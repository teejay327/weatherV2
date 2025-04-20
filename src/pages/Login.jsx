//import { useState } from 'react';
import { useForm } from '../components/shared/hooks/form-hook.jsx';  // NEW
import Card from '../components/UI/Elements/Card.jsx';
import Input from '../../src/components/FormElements/Input.jsx';  // NEW
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../components/shared/util/validators.js';

const Login = () => {

  // return (
  //   <Card className="bg-gray-800 text-white p-6">
  //     <h2>Login page inside card</h2>
  //   </Card>
  // )
 
  const [formState, inputHandler] = useForm(
    {
      email: { value: '', isValid: false }
    }, 
    {
      password: { value: '', isValid: false  }
    },
    false
  );

  const submitHandler = (event) => {
    event.preventDefault();
    console.log('LOGIN FORM DATA:', formState.inputs);
  }

  return (
    <Card className="bg-gray-900 p-6 max-w-md mx-auto mt-10 text-white">
      <h2 className="text-xl font-bold mb-2">Login required</h2>
      <hr className="border-stone-600 mb-4"/>
      <form onSubmit={ submitHandler } className="space-y-4">
        <Input 
           id="email" 
           element="input" 
           type="email" 
           label="Email" 
           validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]} // changed type from text to email
           errorText="Please enter a valid email address" 
           onInput={ inputHandler } 
           placeholder="yourname@example.com"
        />

         <Input 
           id="password" 
           element="input" 
           type="password" 
           label="Password" 
           validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]} // changed type from text to email
           errorText="Please enter a valid password" 
           onInput={ inputHandler } 
           placeholder="your password"
        />

        <button type="submit" 
           disabled={!formState.isValid} 
           className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 
            text-white rounded disabled:opacity-50">
          Login
        </button>
      </form>
    </Card >
  );
};

export default Login;