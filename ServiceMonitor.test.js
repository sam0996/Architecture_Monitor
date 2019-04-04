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
      currency: true,
      news: true,
      stocks: true,
    },
  ]);
});

test('attempt to get from document that does not exist', async () => {
  expect(await ServiceMonitor.getServices('false')).toEqual([]);
});

test('get all documents in collection', async () => {
  expect(await ServiceMonitor.getDocuments('services')).toContain(
    'available_services',
    'currency',
    'stocks',
    'news',
  );
});

test('attempt to get documents from collection that does not exist', async () => {
  expect(await ServiceMonitor.getDocuments('false')).toEqual([]);
});
