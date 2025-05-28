import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Expense = {
	label: string;
	value: string;
};

export type Assignment = {
	id: number;
	label: string;
	hours: number;
	pricePerHour: number;
	percentage: number;
};

export type IncomeData = {
	income: string;
	insurance: string;
	pension: string;
	savings: string;
	vacationChoice: number;
	vacationDays: number;
	carChoice: number;
	expenses: Expense[];
	assignments?: Assignment[];
};

const initialData = {
	income: '',
	insurance: '1000',
	pension: '2000',
	savings: '',
	vacationChoice: 1,
	vacationDays: 25,
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
			label: 'Friskvård',
			value: ''
		},
		{
			label: 'Utbildning',
			value: ''
		}
	],
	assignments: [
		{
			id: 1,
			label: '',
			hours: 168,
			pricePerHour: 0,
			percentage: 0
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
