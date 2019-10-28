import App from './app';
import PostsController from './controllers/posts.controller';
import 'dotenv/config';
const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_PATH,
  } = process.env;
  
const app = new App([new PostsController()], 5001);
app.listen();