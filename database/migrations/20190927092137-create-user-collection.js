const createCollection = async db => {
  await db.createCollection("users", {
    validator: {
      $and: [
        // { _id: { $type: 'binData' } },
        { login: { $type: "string" } },
        { email: { $type: "string" } },
        { password: { $type: "string" } },
        { resetPasswordToken: { $type: "string" } },
        { resetPasswordExpires: { $type: "date" } }
      ]
    },
    validationAction: "error",
    validationLevel: "strict"
  });
};

module.exports = {
  async up(db) {
    try {
      const col = await db.listCollections({ name: "users" }).toArray();
      if (col.length > 0) {
        throw new Error("Collection user already exists in MongoDb. Exited...");
        return;
      }
      await createCollection(db);
    } catch (err) {
      throw err;
    }
  },

  async down(db) {
    try {
      await db.dropCollection("users");
    } catch (err) {
      throw err;
    }
  }
};
