import { Dialog } from "@mui/material";
import React from "react";
import { Product } from "../types";
import Button from "./Button";

type ProductModal = {
  isOpen: boolean,
  onClose: () => void,
  product: Product | null,
}

const ProductModal = ({ isOpen, onClose, product }: ProductModal) => (
  <Dialog open={isOpen} onClose={onClose}>
    {product && (
      <div className="p-2 flex flex-col gap-2">
        <h2>{product.title}</h2>
        <img src={product.thumbnail} alt={product.title} />
        <p>{product.description}</p>
        <p>Cijena: ${product.price}</p>
        <Button onClick={onClose} title="Zatvori" />
      </div>
    )}
  </Dialog>
);

export default ProductModal;
