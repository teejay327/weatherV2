import { useReducer, useEffect } from 'react';
import { validate } from '../util/validators.js';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
      case 'TOUCH':
        return {
          ...state,
          isTouched: true
        }
      default:
        return state;
  }
};

const Input = props => {
  console.log('Input props:', props);

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isTouched: false,
    isValid: false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };

  const element = props.element === 'textarea' ? (
    <textarea 
      id={ props.id }
      rows={ props.row || 3 }
      onChange={ changeHandler }
      onBlur={ touchHandler }
      value={ inputState.value }
      className="w-full p-2 rounded bg-white text-black"
    />
  ) : (
    <input 
      id={ props.id }
      type={ props.type }
      onChange={ changeHandler }
      onBlur={ touchHandler }
      value={ inputState.value }
      className="w-full p-2 rounded bg-white text-black"
      placeholder={ props.placeholder }
    />
  )

  return (
    <div  className="form-control text-white">
      <label htmlFor={props.id} className="block text-sm font-medium mb-1">{props.label}</label>
      {element}
      {/* <input 
        id={props.id}
        type={ props.type}  
        onChange={changeHandler}
        onBlur={touchHandler}
        value={props.value}
        className="text-black p-2"
      /> */}
      {!inputState.isValid && inputState.isTouched && (
        <p className="text-red-400 text-sm mt-1">{props.errorText}</p>
      )}
    </div>


    //<div className="w-9/10 max-w-36 list-none m-1 p-0"> WATCH THE CLASSNAMES UNDERNEATH! We need a class 
    // like this: ${`!inputState.isValid && inputState.isTouched && <tailwinds class>}`
    
    // <div className="w-9/10 max-w-36 list-none m-1 p-0  ${`!inputState.isValid && inputState.isTouched && bg-red-700}` ">
    //   <label htmlFor={ props.id }>{ props.label }</label>
    //   { element }
    //   { !inputState.isValid && inputState.isTouched && <p>{ props.errorText }</p>}
    // </div>  
  )
}

export default Input;