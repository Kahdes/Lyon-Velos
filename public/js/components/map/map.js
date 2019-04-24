export default class Mapbox {
	constructor(props) {
		this.element = props.map.element;
		this.token = props.map.token;
		this.coordinates = props.map.coordinates;
		this.zoom = props.map.zoom;

		this.api = props.api.url + props.api.key;

		this.initialize = this.initialize.bind(this);
		this.tileLayer = this.tileLayer.bind(this);
		this.createMarker = this.createMarker.bind(this);
	}

	/**
	 * * initialize() : 
	 */
	initialize() {
		const mapbox = this;
		const map = this.element.setView(
			this.coordinates.xy,
			this.coordinates.zoom
		);

		$.ajax({
			url: this.api,
			cache: false,
			success: function (data) {
				mapbox.tileLayer(map);
				mapbox.createMarker(map, data);
			}
		});
	}

	/**
	 * * tileLayer() : 
	 * @param {*} map 
	 */
	tileLayer(map) {
		const copy = `
			Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,
			<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,
			Imagery © <a href="https://www.mapbox.com/">Mapbox</a>
		`;

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			id: 'mapbox.streets',
			maxZoom: this.zoom,
			accessToken: this.token,
			attribution: copy
		}).addTo(map);
	}

	/**
	 * * createMarker() : 
	 * @param {*} map 
	 * @param {*} list 
	 */
	createMarker(map, list) {
		for (let i = 0; i < list.length; i++) {
			const station = list[i];
			const text = `<strong>${station.name}</strong>`;
			const latlng = [station.position.lat, station.position.lng];
			const marker = L.marker(latlng)
				.addTo(map)
				.bindPopup(text);
			marker.on('click', (e) => {
				map.setView(e.latlng, 17);
			});
		}
	}
}