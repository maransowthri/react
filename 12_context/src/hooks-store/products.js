import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    TOGGLE_FAV: (state, payload) => {
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === payload.id) {
            return { ...product, isFavorite: !product.isFavorite };
          }
          return product;
        }),
      };
    },
  };
  initStore(actions, {
    products: [
      {
        id: "p1",
        title: "Red Scarf",
        description: "A pretty red scarf.",
        isFavorite: false,
      },
      {
        id: "p2",
        title: "Blue T-Shirt",
        description: "A pretty blue t-shirt.",
        isFavorite: false,
      },
      {
        id: "p3",
        title: "Green Trousers",
        description: "A pair of lightly green trousers.",
        isFavorite: false,
      },
      {
        id: "p4",
        title: "Orange Hat",
        description: "Street style! An orange hat.",
        isFavorite: false,
      },
    ],
  });
};

export default configureStore;
