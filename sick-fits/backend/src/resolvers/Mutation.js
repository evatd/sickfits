const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in

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
  },
  updateItem(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1. find the item - reason we're looking for it first,
    // is to check if the people who
    // want to edit have the permission to do so

    // pass in the where we created
    // usually we just pass in info,
    // this is going to take in the query form the fornt end
    // and request for those fields to come back -  title, id, description...
    // but sometimes we have an intermediary, before we query for item (last line)
    // and in this intermediary we're asking for title specifically
    // using a graphQL qeury with backticks
    const item = await ctx.db.query.item({ where }, `{ id title}`);
    // 2. Check if they own that item, or have the permissions
    // TODO
    // 3. Delete it!
    return ctx.db.mutation.deleteItem({ where }, info);
  }
};

module.exports = Mutations;
