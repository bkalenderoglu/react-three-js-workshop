import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { indexBy } from 'ramda';
import { useEffect, useRef, useState } from 'react';
import { PointLight } from 'three';
import Airport from '../components/Airport';
import Globe from '../models/Globe';
import { IAirport, IFlight } from '../types';
import { parseFlightDates } from '../Utilities';
import Flight from './Flight';
import Sun from './Sun';

export default function FlightsScene() {
  const [airportsList, setAirportsList] = useState<IAirport[]>([]);
  const [airportsMap, setAirportsMap] = useState<{ [key: string]: IAirport }>({});
  const [flightsList, setFlightsList] = useState<IFlight[]>([]);

  useEffect(() => {
    fetch('/data/airports.json')
      .then((e) => e.json())
      .then((airportsData: IAirport[]) => {
        setAirportsList(airportsData);

        const airportsMap = indexBy((e) => e.id, airportsData);
        setAirportsMap(airportsMap);
      });
  }, []);

  useEffect(() => {
    fetch('/data/flights.json')
      .then((e) => e.json())
      .then((flightsData: IFlight[]) => {
        const flights = flightsData.map((f) => parseFlightDates(f));
        setFlightsList(flightsData);
      });
  }, []);

  const flights = flightsList.slice(0, 10);

  return (
    <>
      <OrbitControls />
      <Sun />
      <Globe />
      {flights.map((flight) => {
        if (airportsList.length > 0) {
          const to = airportsMap[flight.arrivalAirportId];
          const from = airportsMap[flight.departureAirportId];
          return <Flight key={flight.id} from={from} to={to} />;
        } else {
          return null;
        }
      })}
      {airportsList.map((airport) => {
        return <Airport key={airport.id} airport={airport} />;
      })}
    </>
  );
}
