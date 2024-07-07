import { createContext } from 'react';
import { ICartContextType } from './types';


const CartContext = createContext<ICartContextType | undefined>(undefined);

export default CartContext;