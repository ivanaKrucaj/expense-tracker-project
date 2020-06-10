const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/expense-tracker";
// mongodb+srv://justinebenevent:<password>@cluster0-jo7rd.mongodb.net/<dbname>?retryWrites=true&w=majority
// mongodb+srv://ivana:dc4ZEBuSf6nW*JB@cluster0-s62u0.mongodb.net/<dbname>?retryWrites=true&w=majority

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    console.log(`Successfully connected to the database ${MONGODB_URI}`)
  )
  .catch((error) => {
    console.error(
      `An error ocurred trying to connect to the database ${MONGODB_URI}: `,
      error
    );
    process.exit(1);
  });
