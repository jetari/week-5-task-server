// const http = require('http');
// const Server = require('./server');
import Server from './app.js';
import {   readRequestBody,
  handleDeleteRequest,  
  handlePutRequest,
  handlePostRequest,
  saveData,
  getData,
  sendResponse,
  getNextId } from './app';

describe('Server Efficiency Tests', () => {
  let server;

  beforeAll(() => {
    server = new Server();
    server.listen(3005);
  });

  afterAll(() => {
    server.close();
  });

  it('should efficiently handle multiple consecutive POST requests', async () => {
    const numberOfRequests = 100; // You can adjust this number based on your needs

    const postData = {
      organization: 'example',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      products: ['example'],
      marketValue: '50%',
      address: 'example',
      ceo: 'example',
      country: 'example',
      noOfEmployees: 10,
      employees: ['employee1', 'employee2'],
    };

    // Measure the time it takes to execute multiple consecutive POST requests
    const startTime = Date.now();

    for (let i = 0; i < numberOfRequests; i++) {
      const options = {
        hostname: 'localhost',
        port: 3005,
        path: '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const req = http.request(options, (res) => {
        if (res.statusCode !== 200) {
          console.error('Error:', res.statusCode);
          process.exit(1);
        }
      });

      req.write(JSON.stringify(postData));
      req.end();
    }

    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    console.log(
      `Processed ${numberOfRequests} requests in ${elapsedTime} milliseconds.`
    );
    // You can add assertions or logging based on your efficiency criteria
  });
});