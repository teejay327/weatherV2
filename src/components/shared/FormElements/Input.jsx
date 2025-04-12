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
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || '',
    isTouched: false,
    isValid: props.valid || false
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

  const element = props.element === 'input' ? (
    <input 
      id={ props.id }
      type={ props.type }
      placeholder={ props.placeHolder }
      onChange={ changeHandler }
      onBlur={ touchHandler }
      value={ inputState.value }
    /> ) : null;

  return (
    //<div className="w-9/10 max-w-36 list-none m-1 p-0"> WATCH THE CLASSNAMES UNDERNEATH!
    <div className="w-9/10 max-w-36 list-none m-1 p-0  ${`!inputState.isValid && inputState.isTouched}` ">
      <label htmlFor={ props.id }>{ props.label }</label>
      { element }
      { !inputState.isValid && inputState.isTouched && <p>{ props.errorText }</p>}
    </div>  
  )
}

export default Input;