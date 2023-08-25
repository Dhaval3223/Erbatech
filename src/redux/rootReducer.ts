import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import rolesReducer from 'src/pages/Roles/slice';
import userReducer from 'src/pages/user/slice';
import menuReducer from 'src/pages/Menu/slice';
import accesControlReducer from 'src/pages/accessControl/slice';
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import CommonReducer from './slices/index';

// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  roles: rolesReducer,
  user: userReducer,
  menu: menuReducer,
  accesControl: accesControlReducer,
  common: CommonReducer,
  product: persistReducer(productPersistConfig, productReducer),
});

export default rootReducer;
