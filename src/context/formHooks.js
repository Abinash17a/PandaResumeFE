import { useContext } from 'react';
import FormContext from './FormContext.jsx';

// Custom hook to use context
export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};
