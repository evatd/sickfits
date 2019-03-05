const Mutations = {
  createDog(parent, args, ctx, info) {
    // create a dog!
    console.log(args);

    return [{ name: "Snickers" }, { name: "Sunny" }];
  }
};

module.exports = Mutations;

// const mutations = {};

// module.exports = mutations;
