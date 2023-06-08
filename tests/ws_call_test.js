const supertest = require('supertest');
const server = require('../src/server');

const requestWithSupertest = supertest(server);
const aw_QUERY = "/data/report/stationtype=AMBWeatherPro_V5.1.1&PASSKEY=E8:DB:84:F2:9D:19&dateutc=2023-06-07+16:23:36&tempf=85.5&humidity=80&windspeedmph=2.24&windgustmph=2.24&maxdailygust=4.47&winddir=95&uv=0&solarradiation=67.38&hourlyrainin=0.000&eventrainin=0.000&dailyrainin=0.000&weeklyrainin=0.000&monthlyrainin=0.000&totalrainin=0.012&battout=1&tempinf=84.7&humidityin=79&baromrelin=30.002&baromabsin=29.828";
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
