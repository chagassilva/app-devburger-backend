
//const app = require('./app');

import app from './app';


const port = process.env.PORT || 3002;

app.listen(port,"0.0.0.0", () => {
  console.log(`Server started on port ${port}`);
});




// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });


// import app from './app';

// app.listen(3001, () => {
//   console.log('Server started on port 3001');
// });


