import { gql } from '@apollo/client';

export const ALL_PEOPLE = gql`
query People {
  getAllPeople {
    name
    height
    mass
    gender
    homeworld
  }
}
`;

export const SEARCH_PERSON = gql`
  query Search($personName: String!) {
    searchPerson(personName: $personName) {
      name
      height
      mass
      gender
      homeworld
    }
  }
`;

export const NEXT_PAGE = gql`
  query NextPage($pageNumber: String!) {
    next(pageNumber: $pageNumber) {
      name
      height
      mass
      gender
      homeworld
    }
  }
`;
