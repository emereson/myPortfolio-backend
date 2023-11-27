require('dotenv').config();
const { db } = require('./database/config');
const app = require('./app');

db.authenticate()
  .then(() => console.log(`Database Authenticated 🙌`))
  .catch((err) => console.log(err));
db.sync()
  .then(() => console.log(`Database Synced! 👍`))
  .catch((err) => console.log(err));

const port = +process.env.PORT || 3027;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
