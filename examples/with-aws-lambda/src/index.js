import express from 'express';
import awsExpress from 'aws-serverless-express';

let app = require('./server').default;
let lambdaServer;

if(process.env.NODE_ENV === 'production') {
  const server = awsExpress.createServer(app);
  lambdaServer = (event,context) => awsExpress.proxy(server, event, context);
} else {
  if (module.hot) {
    module.hot.accept('./server', function() {
      console.log('🔁  HMR Reloading `./server`...');
      try {
        app = require('./server').default;
      } catch (error) {
        console.error(error);
      }
    });
    console.info('✅  Server-side HMR Enabled!');
  }

  const port = process.env.PORT || 3000;

  lambdaServer = express()
    .use((req, res) => app.handle(req, res))
    .listen(port, function(err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`> Started on port ${port}`);
    });
}
export const handler = lambdaServer;