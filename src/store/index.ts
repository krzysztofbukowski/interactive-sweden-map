import { applyMiddleware, createStore } from 'redux';
import ReduxQuerySync from 'redux-query-sync';
import thunk from 'redux-thunk';

import valnattReducers from '../reducers';
import initialState, { IValnattState } from './state';
import { IMapArea } from '../components/Map';

const store = createStore(
  valnattReducers,
  initialState,
  applyMiddleware(thunk)
);

ReduxQuerySync({
  initialTruth: 'location',
  params: {
    area: {
      action: (value: string) => ({type: 'SET_AREA', payload: value}),
      defaultValue: 'national',
      selector: (state: IValnattState) => state.params.area,
      stringToValue: (s: string): IMapArea => {
        return {
          area: s,
          id: s,
          name: 'national'
        }
      },
      valueToString: (value: IMapArea) => `${value.id}`
    },
  },
  replaceState: true,
  store
});

export default store;
