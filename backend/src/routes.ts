import express from 'express';
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
    // this.router.get('/stats', )
    // this.router.post('/activities', ) // save? edit
    // this.router.put('/activities', )
    // this.router.get('/medical-items', )
    
  }
}