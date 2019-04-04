const express = require('express');
const ServiceMonitor = require('./ServiceMonitor');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port || 3000, () => console.log(`Currency service running on port ${port}!`));

app.get('/heartbeat', (req, res) => {
  res.sendStatus(200);
});

setInterval(ServiceMonitor.checkServices, process.env.TIMER);
