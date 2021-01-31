import React, { useState } from "react";

export const ProductsContext = React.createContext({
  products: [],
  toggleFav: (id) => {},
});

const ProductsContextProvider = (props) => {
  const [products, setProducts] = useState([
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
  ]);

  const toggleFav = (id) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, isFavorite: !product.isFavorite };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  return (
    <ProductsContext.Provider value={{ products, setProducts, toggleFav }}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
