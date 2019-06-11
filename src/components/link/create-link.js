import React from 'react';
import useFormValidation from '../../utils/use-form-validation';
import { FirebaseContext } from '../../firebase';

const initialState = { url: '', description: '' };

// !/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)
const isValidUrl = url => /^(ftp|http|https):\/\/[^ "]+$/.test(url);

function validateLinkValues({ url, description }) {
  const errors = {};

  // valid url?
  if (!url) {
    errors.url = 'URL required';
  } else if (!isValidUrl(url)) {
    errors.url = 'Invalid URL';
  }

  // valid description?
  if (!description) {
    errors.description = 'Description required';
  }

  return errors;
}

function CreateLink(props) {
  const { firebase, currentUser } = React.useContext(FirebaseContext);
  const { handleBlur, handleChange, handleSubmit, values, errors } = useFormValidation(
    initialState,
    validateLinkValues,
    handleCreateLink,
  );

  function handleCreateLink() {
    if (!currentUser) {
      props.history.push('/login');
      return;
    }
    const { url, description } = values;
    const newLink = {
      url,
      description,
      postedBy: { id: currentUser.uid, name: currentUser.displayName },
      votes: [],
      comments: [],
      createdAt: Date.now(),
    };
    firebase.db.collection('links').add(newLink);
    props.history.push('/');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-column mt3">
      <input
        type="url"
        name="url"
        placeholder="url"
        autoComplete="off"
        value={values.url}
        onBlur={handleBlur}
        onChange={handleChange}
        className={errors.url && 'error-input'}
      />
      {errors.url && <p className="error-text">{errors.url}</p>}
      <input
        type="text"
        name="description"
        placeholder="description"
        autoComplete="off"
        value={values.description}
        onBlur={handleBlur}
        onChange={handleChange}
        className={errors.description && 'error-input'}
      />
      {errors.description && <p className="error-text">{errors.description}</p>}
      <button type="submit" className="button mt2 w4">
        Submit
      </button>
    </form>
  );
}

export default CreateLink;
