/**
 * @jest-environment node
 */
const ServiceMonitor = require('./ServiceMonitor');

test('calls news service', async () => {
  expect(await ServiceMonitor.checkService(process.env.NEWS_URL)).toBe(true);
});

test('calls service that does not exist', async () => {
  expect(await ServiceMonitor.checkService('false')).toBe(false);
});

test('get services', async () => {
  expect(await ServiceMonitor.getServices(process.env.AVAILABLE_SERVICES_NAME)).toEqual([
    {
      currency: false,
      news: false,
      stocks: false,
    },
  ]);
});

test('attempt to get from document that does not exist', async () => {
  expect(await ServiceMonitor.getServices('false')).toEqual([]);
});
