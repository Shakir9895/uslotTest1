import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import checkoutReducer from './slices/checkout';
import appReducer from './slices/app'

// ----------------------------------------------------------------------


const checkoutPersistConfig = {
  key: 'checkout',
  storage,
  keyPrefix: 'redux-',
  
};

export const rootReducer = combineReducers({
  checkout: persistReducer(checkoutPersistConfig, checkoutReducer),
  
  //app
  app: appReducer,
});
