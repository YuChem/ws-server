const supertest = require('supertest');
const server = require('../src/server');

const winston = require("winston");
server.log = winston.createLogger({
  level: "debug",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
  ],
});


const requestWithSupertest = supertest(server);
const aw_QUERY = "/data/?stationtype=AMBWeatherV4.2.9&PASSKEY=<MAC_ADDRESS>&dateutc=2021-03-19+20:20:12&tempinf=70.3&humidityin=29&baromrelin=29.900&baromabsin=24.756&tempf=62.8&battout=1&humidity=31&winddir=188&windspeedmph=1.1&windgustmph=3.4&maxdailygust=5.8&hourlyrainin=0.000&eventrainin=0.000&dailyrainin=0.000&weeklyrainin=0.000&monthlyrainin=0.000&totalrainin=0.000&solarradiation=622.94&uv=6&batt_co2=1";
// const MOCK_ROI = 'mock_roi';

// jest.mock('../src/services/geocast', () => {
//   // Require the original module to not be mocked...
//   const originalModule = jest.requireActual('../src/services/geocast');

//   return {
//     ...originalModule,
//     findRoi: jest.fn(),
//   };
// });

describe('Public endpoints', () => {
  test('GET /data should save data to a file', async () => {
//    findRoi.mockResolvedValue({ roi: MOCK_ROI, direction: 'forward' });

    const res = await requestWithSupertest
      .get(aw_QUERY);

    expect(res.status).toEqual(200);
    
  });
});
