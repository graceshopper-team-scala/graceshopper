"use strict";

const {
  db,
  models: { User, Vehicle, Order, Order_Vehicle },
} = require("../server/db");
const cardata = require("./vehicledata");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "cody_pw" }),
    User.create({ username: "murphy", password: "cody_pw" }),
  ]);
  const vehicles = await Vehicle.bulkCreate(cardata);

//seeding dummy order data
  const orders = await Promise.all([
    Order.create({status: 'pending'}),
    Order.create({status: 'completed'}),
    Order.create({status: 'completed'})
  ])


const [cody, murphy] = users
const [codyOrder, murphyOrder, murphyOrder2] = orders
const [Nagasaki, Pegassi] = vehicles

await cody.setOrders(codyOrder)
await murphy.setOrders(murphyOrder)
await murphy.addOrder(murphyOrder2)
await murphyOrder.setVehicles(Nagasaki)
await murphyOrder2.setVehicles(Nagasaki)
await codyOrder.setVehicles(Pegassi)


  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

async function seedVehicles() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Vehicles
  const vehicles = await Vehicle.bulkCreate(cardata);

  console.log(`seeded ${vehicles.length} vehicles`);
  console.log(`seeded successfully`);
}
/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
    //await seedVehicles();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
