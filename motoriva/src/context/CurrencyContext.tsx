import { createContext, useContext, useState, type ReactNode } from 'react';
export type Currency='CHF'|'EUR'|'USD';
export const rates:Record<Currency,number>={CHF:1,EUR:.92,USD:1.11};
export const symbols:Record<Currency,string>={CHF:'CHF',EUR:'€',USD:'$'};
type C={currency:Currency;setCurrency:(currency:Currency)=>void;formatPrice:(price:number)=>string};
const Context=createContext<C|null>(null);
export function CurrencyProvider({children}:{children:ReactNode}){const [currency,setCurrency]=useState<Currency>(()=>{const value=localStorage.getItem('motoriva_currency');return value==='EUR'||value==='USD'?value:'CHF'});const change=(value:Currency)=>{setCurrency(value);localStorage.setItem('motoriva_currency',value)};const formatPrice=(price:number)=>`${symbols[currency]} ${ (price*rates[currency]).toFixed(2)}`;return <Context.Provider value={{currency,setCurrency:change,formatPrice}}>{children}</Context.Provider>}
export function useCurrency(){const value=useContext(Context);if(!value)throw new Error('CurrencyProvider missing');return value}
