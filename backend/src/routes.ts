import express, { Request, Response } from 'express';
import Controller from './controller.js';

class Routes {
  router = express.Router();
  controller = new Controller();

  // Initialise the below method when instance is created
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Test database connection
    this.router.get('/test_db', this.controller.testDBConnection);    

    // endpoints
    this.router.get('/statistics', this.controller.getStatistics)
    this.router.post('/activities/save', this.controller.save)
    this.router.put('/activities/edit', this.controller.updateItem)
    this.router.get('/medical-items', this.controller.findAll)

  }
}

export default new Routes().router;
