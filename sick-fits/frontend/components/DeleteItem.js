import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_ITEMS_QUERY } from "./Items";

const DELETE_ITEM_MUTATION = gql`
  # we are asking for id back, just to get something back
  # and know it's beeen deleted
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  // Appollo can give you cache and
  // the payload with all the data - incl deletedItem
  update = (cache, payload) => {
    // item will be deleted in the backend, but not in the cache
    // so we have to manually delete the cache, so it matches the server
    // 1. Read the cache for the items we want

    // Here we ask ourselves whcih query put the items on the page
    // it's ALL_ITEMS_QUERY - make sure it's exported in /Item
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    console.log(data, payload);
    // 2. Filter the deleted item out of the page
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    // 3. Put the items back!
    // when we wan to add them again
    // then, run the query again
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteItem, { error }) => (
          <button
            onClick={() => {
              // see how we add confirm in the if statement
              if (confirm("Are you sure you want to delete this item?")) {
                deleteItem();
              }
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteItem;
