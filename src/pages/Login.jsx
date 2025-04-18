//import { useState } from 'react';
import { useForm } from '../components/shared/hooks/form-hook.jsx';  // NEW
import Card from '../components/UI/Elements/Card.jsx';
import Input from '../../src/components/FormElements/Input.jsx';  // NEW
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from '../components/shared/util/validators.js';

const Login = () => {
  const [formState, inputHandler ] = useForm(
    {
        email: { value: '', isValid: false },
    }, false
  );

const submitHandler = (event) => {
  event.preventDefault();
  console.log(formsState.inputs);
}

  return (
    <Card className="login">
      <h2 className="text-xl font-bold mb-2">Login required</h2>
      <hr />
      <form onSubmit={ submitHandler } className="space-y-4">
        <Input id="email" element="input" type="email" label="email" 
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]} // changed type from text to email
          errorText="Please enter a valid email address" onInput={ inputHandler }
        />
        <button type="submit" disabled={!formState.isValid} className="bg-blue-600 hover:bg-blue-700 
          px-4 py-2 text-white rounded disabled:opacity-50">
          Submit
        </button>
      </form>
    </Card >
  );
};

export default Login;