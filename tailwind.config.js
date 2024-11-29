/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				zefyr: {
					blue: '#799aa7',
					orange: '#fb8500'
				}
			}
		}
	},
	plugins: [require('daisyui')]
};
