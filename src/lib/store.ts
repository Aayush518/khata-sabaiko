import { writable } from 'svelte/store';

// Language store
export const language = writable('ne');

// Data stores
export const customers = writable([]);
export const dealers = writable([]);
export const stocks = writable([]);
export const sales = writable([]);
export const purchases = writable([]);