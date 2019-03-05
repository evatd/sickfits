const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    // access item via context.database.mutation
    // spread your arguments directly into data, as opposed
    // to listing each one
    // pass info var, to make sure the actual item is return from the database
    // when we've created it
    // await the creation and return an item - its value
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    );

    console.log(item);

    return item;
  }
  // createDog(parent, args, ctx, info) {
  //   global.dogs = global.dogs || [];
  //   // create a dog
  //   const newDog = { name: args.name };
  //   global.dogs.push(newDog);
  //   return newDog;
  // },
};

module.exports = Mutations;
