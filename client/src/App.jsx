import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import axios from "axios";
import { Icon } from "leaflet";
import Interweavedocs from "./Components/Interweavedocs";

function App() {
	// let me = []
	const [me, setMe] = useState([]);
	const [data, setData] = useState([]);

	const markerIcon = new Icon({
		iconUrl:
			"https://static.vecteezy.com/system/resources/previews/017/178/337/non_2x/location-map-marker-icon-symbol-on-transparent-background-free-png.png", // URL to the marker icon image
		iconSize: [41, 41], // Size of the marker icon
		iconAnchor: [12, 41], // Position of the icon anchor relative to its top-left corner
		popupAnchor: [0, -41], // Position of the popup anchor relative to the marker's location

		shadowSize: [41, 41], // Size of the marker's shadow
		shadowAnchor: [12, 41], // Position of the shadow anchor relative to the top-left corner
		iconColor: "red", // Custom property to set the marker color
	});

	const mapMarkers = [
		{
			name: "boundary1",
			loc: [6.4494, 3.3703],
		},

		{
			name: "boundary2",
			loc: [6.556839, 3.35086],
		},

		{
			name: "wilmer3",
			loc: [6.445917, 3.334038],
		},

		{
			name: "wilmer4",
			loc: [6.445917, 3.334038],
		},

		{
			name: "apapa5",
			loc: [6.428652, 3.369124],
		},

		{
			name: "apapa6",
			loc: [6.428652, 3.369124],
		},
	];

	React.useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;

					const SearchNearby = async () => {
						const res = await axios
							.post("http://localhost:9095/artesian/search/nearby", {
								latitude: 6.4589204,
								longitude: 3.3014819,
							})
							.then((res) => {
								console.log(res);
								setData(res?.data);
							});
					};

					SearchNearby();
					// console.log(latitude, longitude);
					// me.push(latitude, longitude);
					setMe([latitude, longitude]);
					// Use latitude and longitude coordinates
				},
				(error) => {
					// Handle error
				},
			);
		} else {
			// Geolocation not supported by the browser
		}
		// getLocation();
	}, [me, data]);

	console.log("this is mes", me);

	return (
		<div style={{ overflow: "hidden" }}>
			<MapContainer
				style={{
					height: "97vh",
					width: "100vw",
					overflow: "hidden",
				}}
				center={[6.4531, 3.3958]}
				zoom={13}
				scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				{data.length >= 1 ? (
					<>
						{data.map((props) => (
							<Marker position={props.location?.coordinates}>
								<Popup>
									<h2>{props?.name}</h2>
									<h5>{props?.email}</h5>
									<p>{props?.category}</p>
									<p>{props.location?.coordinates}</p>
								</Popup>
							</Marker>
						))}
					</>
				) : null}

				{me.length > 1 ? (
					<Marker icon={markerIcon} position={[6.4474, 3.3903]}>
						<Popup>this is me{me}</Popup>
					</Marker>
				) : null}
			</MapContainer>
			<div
				style={{
					position: "absolute",
					height: "70px",
					width: "100%",
					// background: "white",
					top: 0,
					// left: "300px",
					right: 0,
					left: 0,
					bottom: 0,
					zIndex: 9999,
					display: "flex",
					justifyItems: "center",
					alignItems: "center",
				}}>
				<select style={{ width: "300px", height: "40px", marginLeft: "100px" }}>
					<option>Painter</option>
					<option>Painter</option>
					<option>Painter</option>
					<option>Painter</option>
				</select>
				<br />
				<br />
				<br />
				<br />
				// <Interweavedocs />
			</div>
		</div>
	);
}

export default App;
