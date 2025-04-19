//import { useState } from 'react';
import { useForm } from '../components/shared/hooks/form-hook.jsx';  // NEW
import Card from '../components/UI/Elements/Card.jsx';
import Input from '../../src/components/FormElements/Input.jsx';  // NEW
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from '../components/shared/util/validators.js';

const Login = () => {
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
    <div className="p-4 bg-gray-900 text-white max-w-md mx-auto mt-10">
      
      {/* <h2 className="text-xl font-bold mb-4">login</h2>
      <form>
        <Input 
          id="email"
          element="input"
          type="email"
          label="Email"
          onInput={ inputHandler }
          validators={[]}
          errorText="Please enter a valid email"
          placeholder="yourname@example.com"
        />
      </form> */}
    </div>
  )


//   return (
//     <Card className="login">
//       <h2 className="text-xl font-bold mb-2">Login required</h2>
//       <hr />
//       <form onSubmit={ submitHandler } className="space-y-4">
//         <Input id="email" element="input" type="email" label="Email" 
//           validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]} // changed type from text to email
//           errorText="Please enter a valid email address" onInput={ inputHandler } placeholder="yourname@example.com"
//         />
//         <button type="submit" disabled={!formState.isValid} className="bg-blue-600 hover:bg-blue-700 
//           px-4 py-2 text-white rounded disabled:opacity-50">
//           Submit
//         </button>
//       </form>
//     </Card >
//   );
};

export default Login;