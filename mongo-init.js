// mongo-init.js
print("Start MongoDB initialization");

try {
  db.auth(
    process.env.MONGO_INITDB_ROOT_USERNAME,
    process.env.MONGO_INITDB_ROOT_PASSWORD
  );

  db = db.getSiblingDB("www_db");

  db.createUser({
    user: process.env.MONGO_USER,
    pwd: process.env.MONGO_PASSWORD,
    roles: [
      {
        role: "readWrite",
        db: "www_db",
      },
    ],
  });

  // Create initial collections if needed
  db.createCollection("posts");

  print("MongoDB initialization completed successfully");
} catch (error) {
  print("MongoDB initialization failed:", error);
  throw error;
}
