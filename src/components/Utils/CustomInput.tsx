import './CustomInput.css';
import React from 'react';
import { faSearch, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from 'react-loader-spinner';

export const CustomInput = (props: any) => (
  <div className="custom-input">
    <input
      type="text"
      placeholder={ props.placeholder }
      className="custom-input__input"
      onChange={ props.onChange }
      value={ props.value }
    />
    {
      (props.value && props.handleReset) && (
        <button type="button" className="custom-input__reset" aria-label="clear" onClick={ props.handleReset }>
          <FontAwesomeIcon icon={ faWindowClose } color="#1476F2" />
        </button>
      )
    }
    <button className="custom-input__cta" onClick={ props.handleSubmit }>
      {
        props.isLoading ? (<Loader type="TailSpin" height={ 12 } width={ 12 } color="#fff" />) : (<FontAwesomeIcon icon={ faSearch } color="#fff" />)
      }
    </button>
  </div>
);
