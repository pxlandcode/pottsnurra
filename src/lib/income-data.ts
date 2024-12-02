import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Expense = {
	label: string;
	value: string;
};

export type IncomeData = {
	income: string;
	insurance: string;
	pension: string;
	savings: string;
	vacationChoice: number;
	carChoice: number;
	expenses: Expense[];
};

const initialData = {
	income: '100000',
	insurance: '1000',
	pension: '2000',
	savings: '5000',
	vacationChoice: 1,
	carChoice: 0,
	expenses: [
		{
			label: 'Dator',
			value: ''
		},
		{
			label: 'Mobil',
			value: ''
		},
		{
			label: 'Mobilabonnemang',
			value: ''
		},
		{
			label: 'Utbildning',
			value: ''
		},
		{
			label: 'Friskvård',
			value: ''
		}
	]
};

const createIncomeDataStore = () => {
	const { subscribe, set } = writable<IncomeData>(
		browser && localStorage.getItem('data')
			? JSON.parse(localStorage.getItem('data')!) ?? initialData
			: initialData
	);

	subscribe((value) => {
		if (browser) localStorage.setItem('data', JSON.stringify(value));
	});

	return {
		subscribe,
		set,
		reset: () => set(structuredClone(initialData))
	};
};

export const incomeData = createIncomeDataStore();
