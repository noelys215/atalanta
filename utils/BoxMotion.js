export const boxAnimation = {
	box: 'box',
	hidden: { y: '50%', opacity: 0 },
	visible: { y: 0, opacity: 1, scale: 1 },
	transition: { duration: 0.2, ease: 'easeIn' },
	exit: {
		y: '50%',
		opacity: 0,
		transition: { duration: 0.2 },
	},
};

export const pageAnimation = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, duration: 0.3, ease: 'easeInOut' },
	exit: {
		opacity: 0,
		transition: { duration: 2.3 },
	},
};
