import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { PointLight } from 'three';
import Globe from '../models/Globe';
import { IAirport, IFlight } from '../types';
import Flight from './Flight';
import Sun from './Sun';

export default function FlightsScene() {
  const [airportsList, setAirportsList] = useState<IAirport[]>([]);
  const [flightsList, setFlightsList] = useState<IFlight[]>([]);

  useEffect(() => {
    fetch('/data/airports.json')
      .then((e) => e.json())
      .then((airportsData) => {
        setAirportsList(airportsData);
      });
  }, []);

  useEffect(() => {
    fetch('/data/flights.json')
      .then((e) => e.json())
      .then((flightsData) => {
        setFlightsList(flightsData);
      });
  }, []);

  const sydney = airportsList.find((e) => e.id === 'SYD');
  const budapest = airportsList.find((e) => e.id === 'BUD');

  return (
    <>
      <OrbitControls />
      <Sun />
      <Globe />
      {sydney && budapest && <Flight from={sydney} to={budapest} />}
      {budapest && sydney && <Flight from={budapest} to={sydney} />}
    </>
  );
}
