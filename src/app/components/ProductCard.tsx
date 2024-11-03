import React from "react";
import { Product } from "../types";
import Button from "./Button";

type ProductCard = {
  product: Product,
  disabled: boolean,
  onDetailClick: (product: Product) => void,
  onCartAdd: (product: Product) => void,
}

const ProductCard = ({ product, disabled, onDetailClick, onCartAdd }: ProductCard) => (
  <div className="p-1 border border-[#ddd] rounded-lg text-center">
    <img src={product.thumbnail} alt={product.title} />
    <h3>Naziv: {product.title}</h3>
    <p>Opis: {product.description.slice(0, 100)}...</p>
    <p>${product.price}</p>
    <Button
      onClick={() => onDetailClick(product)}
      title="Detalji"
    />
    <Button
      disabled={disabled}
      onClick={() => onCartAdd(product)}
      title="Dodaj"
    />
  </div>
);

export default ProductCard;
