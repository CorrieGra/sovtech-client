import './HomePage.css';
import React, { FC, useEffect, useState } from 'react';
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
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [initialLoadCompleted, setInitialLoadCompleted] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageRequested, setPageRequested] = useState<boolean>(false);
  const people = useStoreState((state) => state.people);
  const addPeopleToState = useStoreActions((actions) => actions.loadPeople);
  const loadRequestedPage = useStoreActions((actions) => actions.resetOrLoadPage);
  const { sortDesc } = useStoreState((state) => state);
  const { sortAsc } = useStoreState((state) => state);
  const { loading: isLoading, data } = useQuery(ALL_PEOPLE);
  const [next, { loading: nextIsLoading, data: nextData }] = useLazyQuery(NEXT_PAGE);

  useEffect(() => {
    if (pageRequested && nextData) {
      loadRequestedPage(nextData.next);
      setPageRequested(false);
    } else if ((data && !initialLoadCompleted) || nextData) {
      const peopleToAddToState = isLoadingMore ? nextData.next : data.getAllPeople;
      addPeopleToState(peopleToAddToState);
      setInitialLoadCompleted(true);
    }
  }, [data, nextData]);

  const handleNext = () => {
    const newPage = pageNumber + 1;
    next({ variables: { pageNumber: newPage.toString() } });
    setIsLoadingMore(true);
    setPageNumber(newPage);
  };

  const handlePageRequest = (page: any) => {
    next({ variables: { pageNumber: page.toString() } });
    setPageRequested(true);
  };

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
          isLoading={ nextIsLoading }
          onChange={ (e: any) => setCurrentPage(e.target.value) }
          handleSubmit={ () => handlePageRequest(currentPage) }
          value={ currentPage }
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
              { !nextIsLoading ? 'Load More' : (<Loader type="ThreeDots" color="#fff" height={ 20 } width={ 15 } />) }
            </button>
          </div>
        )
      }
    </div>
  );
};
