import { writable } from 'svelte/store';

export const status = writable('process');
export const current = writable(0);