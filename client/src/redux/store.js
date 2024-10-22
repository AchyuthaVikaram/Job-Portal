import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authSliceReducer from "./feauters/authSlice";
import jobSliceRducer from "./feauters/jobSlice";
import filterSliceReducer from "./feauters/filterCompanySlice";
import filterJobSliceReducer from "./feauters/filterJobSlice";
import querySliceReducer from "./feauters/filterQuerySlice";
import filterJobReducer from "./feauters/jobFilter";

// Step 3: Create a persist config
const persistConfig = {
	key: "root", // Key for localStorage
	version: 1, // Version of persistence schema
	storage, // Default storage engine (localStorage)
};

// Combine all reducers
const rootReducer = combineReducers({
	auth: authSliceReducer, // Slices of your Redux state
	job: jobSliceRducer,
	filter:filterSliceReducer,
	filterJob:filterJobSliceReducer,
	query:querySliceReducer,
	jobFilter:filterJobReducer,
});

// Wrap your rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Step 4: Configure store with persisted reducer and middleware
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

// Step 5: Persist the store
const persistor = persistStore(store);

export { store, persistor };

export default store;
