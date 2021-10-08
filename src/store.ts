import {
  action,
  Action,
  Computed,
  computed,
  createStore,
  createTypedHooks,
} from 'easy-peasy';

interface IStore {
  people: any[];
  loadPeople: Action<IStore, any>;
  loadPerson: Action<IStore, any>;
  resetOrLoadPage: Action<IStore, any>;
  sortDesc: Computed<IStore, any>;
  sortAsc: Computed<IStore, any>;
}

export const store = createStore<IStore>({
  people: [],
  loadPeople: action((state, payload) => {
    state.people.push(...payload);
  }),
  loadPerson: action((state, payload) => {
    state.people.splice(0, state.people.length);
    state.people.push(payload);
  }),
  resetOrLoadPage: action((state, payload) => {
    state.people.splice(0, state.people.length);
    state.people.push(...payload);
  }),
  sortDesc: computed((state) => () => state.people.sort((a: any, b: any) => (a.name > b.name ? -1 : 1))),
  sortAsc: computed((state) => () => state.people.sort((a: any, b: any) => (a.name < b.name ? -1 : 1))),
});

const typedHooks = createTypedHooks<IStore>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
