"use client";
import { useState, useEffect } from "react";

function useSelectOptions(url) {
	const [list, setList] = useState(null);
	const [selectedId, setSelectedId] = useState("");
	useEffect(() => {
		if (url === null) {
			return;
		}

		let ignore = false;
		fetchData(url).then((result) => {
			if (!ignore) {
				setList(result);
				setSelectedId(result[0].id);
			}
		});
		return () => {
			ignore = true;
		};
	}, [url]);
	return [list, selectedId, setSelectedId];
}

function fetchData(url) {
	if (url === "/planets") {
		return fetchPlanets();
	} else if (url.startsWith("/planets/")) {
		const match = url.match(/^\/planets\/([\w-]+)\/places(\/)?$/);
		if (!match || !match[1] || !match[1].length) {
			throw Error('Expected URL like "/planets/earth/places". Received: "' + url + '".');
		}
		return fetchPlaces(match[1]);
	} else
		throw Error(
			'Expected URL like "/planets" or "/planets/earth/places". Received: "' + url + '".',
		);
}

async function fetchPlanets() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: "earth",
					name: "Earth",
				},
				{
					id: "venus",
					name: "Venus",
				},
				{
					id: "mars",
					name: "Mars",
				},
			]);
		}, 1000);
	});
}

async function fetchPlaces(planetId) {
	if (typeof planetId !== "string") {
		throw Error(
			"fetchPlaces(planetId) expects a string argument. " +
				"Instead received: " +
				planetId +
				".",
		);
	}
	return new Promise((resolve) => {
		setTimeout(() => {
			if (planetId === "earth") {
				resolve([
					{
						id: "laos",
						name: "Laos",
					},
					{
						id: "spain",
						name: "Spain",
					},
					{
						id: "vietnam",
						name: "Vietnam",
					},
				]);
			} else if (planetId === "venus") {
				resolve([
					{
						id: "aurelia",
						name: "Aurelia",
					},
					{
						id: "diana-chasma",
						name: "Diana Chasma",
					},
					{
						id: "kumsong-vallis",
						name: "Kŭmsŏng Vallis",
					},
				]);
			} else if (planetId === "mars") {
				resolve([
					{
						id: "aluminum-city",
						name: "Aluminum City",
					},
					{
						id: "new-new-york",
						name: "New New York",
					},
					{
						id: "vishniac",
						name: "Vishniac",
					},
				]);
			} else throw Error("Unknown planet ID: " + planetId);
		}, 1000);
	});
}

export default function ChainOfSelect() {
	const [planetList, planetId, setPlanetId] = useSelectOptions("/planets");

	const [placeList, placeId, setPlaceId] = useSelectOptions(
		planetId ? `/planets/${planetId}/places` : null,
	);

	return (
		<>
			<label>
				Pick a planet:{" "}
				<select
					className="dropdown"
					value={planetId}
					onChange={(e) => {
						setPlanetId(e.target.value);
					}}
				>
					{planetList?.map((planet) => (
						<option className="color-option" key={planet.id} value={planet.id}>
							{planet.name}
						</option>
					))}
				</select>
			</label>
			<label>
				Pick a place:{" "}
				<select
					className="dropdown"
					value={placeId}
					onChange={(e) => {
						setPlaceId(e.target.value);
					}}
				>
					{placeList?.map((place) => (
						<option className="color-option" key={place.id} value={place.id}>
							{place.name}
						</option>
					))}
				</select>
			</label>
			<hr />
			<p>
				You are going to: {placeId || "..."} on {planetId || "..."}{" "}
			</p>
		</>
	);
}
