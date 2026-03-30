import React, { createContext, useReducer } from 'react';
import { initialState } from '../constants/formConstants.js';
import { formReducer } from '../utils/formUtils.js';

// Create context
const FormContext = createContext();

// Provider component
const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export { FormProvider };
export default FormContext;