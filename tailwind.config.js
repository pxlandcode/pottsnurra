/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Quicksand', 'sans-serif']
            },
            colors: {
                primary: {
                    DEFAULT: '#fb8500', 
                    hover: '#D67202'
                }, 
                darkHover: '#191E24',
                secondary: '#799aa7', 
                zefyr: {
                    teal: '#799aa7',
                    orange: '#fb8500'
                }
            }
        }
    },
    daisyui: {
        themes: [
            {
                dark: {
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    ...require('daisyui/src/theming/themes')['[data-theme=dark]'],
                    primary: '#fb8500',
                    secondary: '#799aa7'
                }
            }
        ]
    },
    plugins: [require('daisyui')]
};



