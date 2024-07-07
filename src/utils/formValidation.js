export const formValidation = values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Please enter username';
  }
  if (!values.password) {
    errors.password = 'Please enter password';
  } else if (values.password.length < 6) {
    errors.password = 'Password length should be at least 6 characters';
  }

  return errors;
};
