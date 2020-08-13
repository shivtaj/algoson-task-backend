const MongoClient = require("mongodb").MongoClient;
const GridFsStorage = require('multer-gridfs-storage');

const dbConnectionUrl = "mongodb+srv://shivtaj:shivtaj021@cluster0.ibqdu.mongodb.net/<dbname>?retryWrites=true&w=majority";

// mongodb+srv://shivtaj:shivtaj021@cluster0.ibqdu.mongodb.net/<dbname>?retryWrites=true&w=majority



function initialize(
    dbName,
    dbCollectionName,
    successCallback,
    failureCallback
) {
    MongoClient.connect(dbConnectionUrl, { useNewUrlParser: true }, function (err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err); // this should be "caught" by the calling function
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);
            console.log("[MongoDB connection] SUCCESS");

            successCallback(dbCollection);
        }
    });
}
  



module.exports = {
    initialize
};
