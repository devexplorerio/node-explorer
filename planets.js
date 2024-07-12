const { parse } = require('csv-parse');
const fs = require('fs');

const planets = [];

const isHabitablePlanet = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED' && 
    planet['koi_insol'] > .36 && 
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6;
}

fs.createReadStream('planets.csv')
    .pipe(parse({
        comment: '#',
        columns: true
    }))
    .on('data', (data) => {
        if (!isHabitablePlanet(data)) return;
        planets.push(data);
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        console.log(planets.map((planet) => planet.kepler_name));
        console.log(`${planets.length} habitable planets found`);
    });