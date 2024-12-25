import { createContext } from 'react';

const baseURL = 'http://localhost:8000/';
export { baseURL };

const TokenContext = createContext(undefined);
export { TokenContext };

const RefreshListContext = createContext(undefined);
export { RefreshListContext };
