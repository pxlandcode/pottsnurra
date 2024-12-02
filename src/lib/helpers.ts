export const formatterToSek = new Intl.NumberFormat('sv-SE', {
	style: 'currency',
	currency: 'SEK',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
});
