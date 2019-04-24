const config = {
	api: {
		url: 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=',
		key: null /* JCDecaux API Key */
	},
	map: {
		element: L.map('map'),
		token: null /* OpenStreetMap Token */,
		coordinates: {
			'xy': [45.76, 4.85],
			'zoom': 13
		},
		zoom: 20
	}
};

export default config;