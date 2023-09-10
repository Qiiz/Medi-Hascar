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
    this.router.get('/medical-items', this.controller.getMedItems)
    this.router.get('/activities', this.controller.getActivities)

    // CRUD operations
    this.router.post('/item/edit', this.controller.updateItem)
    this.router.post('/item/add', this.controller.save)
    this.router.post('/item/delete', this.controller.deleteItem)
    this.router.get('/forecast', this.controller.getForecast)

  }
}

export default new Routes().router;
