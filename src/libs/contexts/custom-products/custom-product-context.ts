import { createContext } from 'react';
import { ICustomProductContext } from './types';


const CustomProductContext = createContext<ICustomProductContext | undefined>(undefined);

export default CustomProductContext;