import React from 'react';

function useFormValidataion(initialState, validateValues, authenticateUser) {
  const [values, setValues] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        authenticateUser();
      }
      setIsSubmitting(false);
    }
  }, [authenticateUser, errors, isSubmitting]);

  function handleChange(event) {
    event.persist();
    setValues(previousValues => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  }

  function handleBlur() {
    const validationErrors = validateValues(values);
    setErrors(validationErrors);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    const validationErrors = validateValues(values);
    setErrors(validationErrors);
  }

  return { handleBlur, handleChange, handleSubmit, errors, values, isSubmitting };
}

export default useFormValidataion;
