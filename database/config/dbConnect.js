const db = require('./dbConfig');

exports.connect = async () => {
  try {
    await db.sync({ force: true });
    //await db.sync();
    console.log('Database conncetion successful');
  } catch (err) {
    console.log(`Database conncetion error : ${err}`);
  }
};
