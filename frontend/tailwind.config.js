/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

// (Optional) Import default theme when using a custom font (Step 7)
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Quantico',
                    ...defaultTheme.fontFamily.sans
                ]
  		},
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			success: '#10B981',
  			warning: '#F59E0B',
  			error: '#EF4444',
  			backgroundLight: '#F9FAFB',
  			backgroundDark: '#1F2937',
  			surfaceLight: '#FFFFFF',
  			surfaceDark: '#374151',
  			textLight: '#111827',
  			textDark: '#D1D5DB',
  			borderLight: '#E5E7EB',
  			borderDark: '#4B5563',
  			customGreen: '#22C55E9A',
  			lightblue: '#ADD8E6',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		keyframes: {
  			hide: {
  				from: {
  					opacity: '1'
  				},
  				to: {
  					opacity: '0'
  				}
  			},
  			slideDownAndFade: {
  				from: {
  					opacity: '0',
  					transform: 'translateY(-6px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			slideLeftAndFade: {
  				from: {
  					opacity: '0',
  					transform: 'translateX(6px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			slideUpAndFade: {
  				from: {
  					opacity: '0',
  					transform: 'translateY(6px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			slideRightAndFade: {
  				from: {
  					opacity: '0',
  					transform: 'translateX(-6px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			accordionOpen: {
  				from: {
  					height: '0px'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			accordionClose: {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0px'
  				}
  			},
  			dialogOverlayShow: {
  				from: {
  					opacity: '0'
  				},
  				to: {
  					opacity: '1'
  				}
  			},
  			dialogContentShow: {
  				from: {
  					opacity: '0',
  					transform: 'translate(-50%, -45%) scale(0.95)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translate(-50%, -50%) scale(1)'
  				}
  			},
  			drawerSlideLeftAndFade: {
  				from: {
  					opacity: '0',
  					transform: 'translateX(100%)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			drawerSlideRightAndFade: {
  				from: {
  					opacity: '1',
  					transform: 'translateX(0)'
  				},
  				to: {
  					opacity: '0',
  					transform: 'translateX(100%)'
  				}
  			}
  		},
  		animation: {
  			hide: 'hide 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  			slideDownAndFade: 'slideDownAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  			slideLeftAndFade: 'slideLeftAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  			slideUpAndFade: 'slideUpAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  			slideRightAndFade: 'slideRightAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  			accordionOpen: 'accordionOpen 150ms cubic-bezier(0.87, 0, 0.13, 1)',
  			accordionClose: 'accordionClose 150ms cubic-bezier(0.87, 0, 0.13, 1)',
  			dialogOverlayShow: 'dialogOverlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  			dialogContentShow: 'dialogContentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  			drawerSlideLeftAndFade: 'drawerSlideLeftAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  			drawerSlideRightAndFade: 'drawerSlideRightAndFade 150ms ease-in'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-animate")],
}