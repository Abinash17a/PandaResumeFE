import React, { createContext, useEffect, useReducer } from 'react';
import { initialState } from '../constants/formConstants.js';
import { formReducer } from '../utils/formUtils.js';

const STORAGE_KEY = 'resumeBuilder.formData';

const loadInitialState = () => {
  if (typeof window === 'undefined') {
    return initialState;
  }

  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (!savedState) {
      return initialState;
    }

    return { ...initialState, ...JSON.parse(savedState) };
  } catch (error) {
    console.error('Failed to load saved form data:', error);
    return initialState;
  }
};

// Create context
const FormContext = createContext(null);

// Provider component
const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, undefined, loadInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save form data:', error);
    }
  }, [state]);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export { FormProvider };
export default FormContext;