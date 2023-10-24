import { Formik } from 'formik';
import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  SearchbarStyled,
} from './Searchbar.styled';
import { object, string } from 'yup';

import { AiOutlineSearch } from 'react-icons/ai';
const schema = object().shape({
  valueInput: string().trim().required('This field is required'),
});

const initialValues = {
  valueInput: '',
};

const Searchbar = ({ onSubmitForm }) => {
  return (
    <SearchbarStyled>
      <Formik
        initialValues={initialValues}
        onSubmit={(value, { resetForm }) => {
          onSubmitForm(value.valueInput);
          resetForm();
        }}
        validationSchema={schema}
      >
        <SearchForm>
          <SearchFormButton type="submit">
            <AiOutlineSearch />
          </SearchFormButton>
          <SearchFormInput
            type="text"
            name="valueInput"
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </SearchbarStyled>
  );
};

export default Searchbar;
