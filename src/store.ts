import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import thunk from 'redux-thunk'
import { rootReducer } from './reducer'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  const middleware = [thunk]

  const devtool =
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()

  const composer = devtool
    ? compose(
        applyMiddleware(...middleware),
        devtool
      )
    : compose(applyMiddleware(...middleware))

  const store = createStore(persistedReducer, composer)
  const persistor = persistStore(store)
  return { store, persistor }
}
