import express from 'express';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';



class App {
  public app: any;
  public port: number;
 
  constructor(controllers, port) {
    
    this.app = express();
    this.port = port;
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }
 
  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      //console.log(`App listening on the port ${this.port}`);
    });
  }

  private connectToTheDatabase() {
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_PATH,
    } = process.env;
    mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}`, {useUnifiedTopology: true,useNewUrlParser: true});
    mongoose.connection.on('connected', () => console.log('Connected'));
    mongoose.connection.on('error', (err) => console.log('Connection failed with - ',err));
  }
}
 
export default App;