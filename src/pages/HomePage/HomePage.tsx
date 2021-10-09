import './HomePage.css';
import React, {
  FC,
  useEffect,
  useState,
} from 'react';
import Loader from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAlphaDown, faSortAlphaUp } from '@fortawesome/free-solid-svg-icons';
import { useQuery, useLazyQuery } from '@apollo/client';
import { useStoreActions, useStoreState } from '../../store';
import { SearchBar } from '../../components/Custom/SearchBar/SearchBar';
import { Card } from '../../components/Custom/Card/Card';
import { ALL_PEOPLE, NEXT_PAGE } from '../../grapqhl/queries';
import { CustomInput } from '../../components/Utils/CustomInput';

export const HomePage: FC = () => {
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>('');
  const [requestedPage, setRequestedPage] = useState<string>('');
  const people = useStoreState((state) => state.people);
  const addPeopleToState = useStoreActions((actions) => actions.loadPeople);
  const loadRequestedPage = useStoreActions((actions) => actions.resetOrLoadPage);
  const { sortDesc } = useStoreState((state) => state);
  const { sortAsc } = useStoreState((state) => state);
  const { loading: isLoading, data } = useQuery(ALL_PEOPLE);
  const [next, { loading: nextPageIsLoading, data: nextData }] = useLazyQuery(NEXT_PAGE);
  const [requestPage, { loading: requestedPageIsLoading, data: requestedPageData }] = useLazyQuery(NEXT_PAGE);

  useEffect(() => {
    if (data) loadRequestedPage(data.getAllPeople);
  }, [data, loadRequestedPage]);

  useEffect(() => {
    if (nextData) addPeopleToState(nextData.next);
  }, [nextData, addPeopleToState]);

  useEffect(() => {
    if (requestedPageData) loadRequestedPage(requestedPageData.next);
  }, [requestedPageData, loadRequestedPage]);

  const handleNext = () => {
    const newPage = currentPage === '' ? 2 : parseInt(currentPage, 10) + 1;
    next({ variables: { pageNumber: newPage.toString() } });
    setCurrentPage(newPage.toString());
  };

  const handlePageRequest = () => { requestPage({ variables: { pageNumber: requestedPage.toString() } }); };

  const handleSort = () => {
    if (!isSorted) {
      const sort = sortDesc;
      sort();
    } else {
      const sort = sortAsc;
      sort();
    }

    setIsSorted(!isSorted);
  };

  const handlePageNumberReset = () => {
    setRequestedPage('');
    requestPage({ variables: { pageNumber: '1' } });
  };

  return (
    <div className="container">
      <div className="toolbar">
        <SearchBar />
        <button type="button" onClick={ handleSort }>
          Sort
          {
            isSorted ? <FontAwesomeIcon icon={ faSortAlphaUp } /> : <FontAwesomeIcon icon={ faSortAlphaDown } />
          }
        </button>

        <CustomInput
          isLoading={ requestedPageIsLoading }
          onChange={ (e: any) => setRequestedPage(e.target.value) }
          handleSubmit={ handlePageRequest }
          handleReset={ handlePageNumberReset }
          value={ requestedPage }
          placeholder="Request page"
        />
      </div>

      {
          isLoading ? (<span className="loader"><Loader type="RevolvingDot" color="#1476F2" height={ 100 } width={ 100 } /></span>) : (
            <div className="character__list">
              {
                    people.map((person: any, i) => (
                      <Card person={ person } key={ i * (Math.random() * 50) } motionKey={ i + 1 } />
                    ))
                }
            </div>
          )
      }

      {
        (!isLoading && people.length > 1) && (
          <div className="load__cta">
            <button type="button" onClick={ handleNext }>
              { !nextPageIsLoading ? 'Load More' : (<Loader type="ThreeDots" color="#fff" height={ 20 } width={ 15 } />) }
            </button>
          </div>
        )
      }
    </div>
  );
};
