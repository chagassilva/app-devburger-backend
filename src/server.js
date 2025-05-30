
//const app = require('./app');

import app from './app';


const port = process.env.PORT || 3002;

app.listen(port,"0.0.0.0", () => {
  console.log(`Server started on port ${port}`);
});




// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });



