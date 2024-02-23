import React, { useState } from 'react';
import { Card, Grid } from 'semantic-ui-react';

export default function Planets({ data }) {
  const [showResidents, setShowResidents] = useState(false);
  const [currentResidents, setCurrentResidents] = useState([]);

  // Function to handle the click event of the "Residents" button
  const handleResidentsClick = async (residents) => {
    try {
      const residentsNames = await Promise.all(residents.map(async residentUrl => {
        const res = await fetch(residentUrl);
        const data = await res.json();
        return data.name;
      }));
      setCurrentResidents(residentsNames);
      setShowResidents(true);
    } catch (error) {
      console.error("Error fetching resident names:", error);
    }
  };

  return (
    <>
      <h1>Planets</h1>
      <Grid columns={3}>
        {data.map((planet, i) => {
          return (
            <Grid.Column key={i}>
              <Card>
                <Card.Content>
                  <Card.Header>{planet.name}</Card.Header>
                  <Card.Description>
                    <strong>Climate:</strong> {planet.climate}<br />
                    <strong>Population:</strong> {planet.population}<br />
                    <strong>Gravity:</strong> {planet.gravity}<br />
                    <button onClick={() => handleResidentsClick(planet.residents)}>Residents</button>
                    {showResidents && (
                      <div>
                        <strong>Residents:</strong>
                        <ul>
                          {currentResidents.map((resident, index) => (
                            <li key={index}>{resident}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          )
        })}
      </Grid>
    </>
  )
}
