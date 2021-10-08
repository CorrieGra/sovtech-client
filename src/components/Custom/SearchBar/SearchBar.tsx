import './SearchBar.css';
import React, { useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useStoreActions } from '../../../store';
import { ALL_PEOPLE, SEARCH_PERSON } from '../../../grapqhl/queries';
import { CustomInput } from '../../Utils/CustomInput';

export const SearchBar = () => {
  const [name, setName] = useState<string | undefined>('');
  const addPersonToState = useStoreActions((actions) => actions.loadPerson);
  const resetState = useStoreActions((actions) => actions.resetOrLoadPage);

  const { data: initialState } = useQuery(ALL_PEOPLE);
  const [search, { loading, data }] = useLazyQuery(SEARCH_PERSON);

  useEffect(() => {
    if (data) addPersonToState(data.searchPerson);
  }, [data, addPersonToState]);

  const handleSearch = () => {
    if (!name || name === '') return;
    search({
      variables: {
        personName: name,
      },
    });
  };

  const handleReset = () => {
    setName('');
    resetState(initialState.getAllPeople);
  };

  return (
    <div className="searchbar">
      <CustomInput
        isLoading={ loading }
        value={ name }
        onChange={ (e: any) => setName(e.target.value) }
        handleSubmit={ handleSearch }
        handleReset={ handleReset }
        placeholder="Search character by name"
      />
    </div>
  );
};
