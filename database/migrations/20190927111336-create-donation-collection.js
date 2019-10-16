const createDonationCollection = async db => {
  await db.createCollection("donations", {
    validator: {
      $and: [
        // { _id: { $type: 'binData' } },
        { volunteerName: { $type: "string" } },
        { email: { $type: "string" } },
        { amount: { $type: "int" } },
        { message: { $type: "string" } },
        { date: { $type: "date" } }
      ]
    },
    validationAction: "error",
    validationLevel: "strict"
  });
};

module.exports = {
  async up(db) {
    try {
      const col = await db.listCollections({ name: "donations" }).toArray();
      if (col.length > 0) {
        throw new Error(
          "Collection donation already exists in MongoDb. Exited..."
        );
        return;
      }
      await createDonationCollection(db);
    } catch (err) {
      throw err;
    }
  },

  async down(db) {
    try {
      await db.dropCollection("donations");
    } catch (err) {
      throw err;
    }
  }
};
