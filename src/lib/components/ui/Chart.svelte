<script>
	import { Pie } from 'svelte-chartjs';
	import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

	const data = {
		labels: ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey', 'Purple'],
		datasets: [
			{
				data: [300, 50, 100, 40, 120, 240],
				backgroundColor: ['#799aa7', '#2b7dc0', '#56b9c6', '#fb8500', '#e87051', '#d3974e'],
				hoverBackgroundColor: ['#799aa7', '#2b7dc0', '#56b9c6', '#fb8500', '#e87051', '#d3974e']
			}
		]
	};

	ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
</script>

<Pie {data} options={{ responsive: true, borderColor: 'transparent' }} />
