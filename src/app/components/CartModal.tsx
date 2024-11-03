import { Dialog } from "@mui/material";
import Button from "./Button";
import { Product } from "../types";
import { useCart } from "../context/CartContext";
import CartRow from "./CartRow";

type CartModal = {
  isOpen: boolean;
  onClose: () => void,
}

const CartModal = ({ isOpen, onClose }: CartModal) => {
  const { cart, addToCart, clearCart } = useCart();
  return <Dialog open={isOpen} onClose={onClose}>
    <div className="p-4 gap-4 flex flex-col">
      <h2>Košarica</h2>
      {!cart.length && <p>Košarica je prazna</p>}
      {!!cart.length && cart.map((cartItem: Product) => (
        <div
          key={cartItem.id}
          className="flex items-center justify-between"
        >
          <CartRow
            title={cartItem.title}
            price={cartItem.price}
            pcs={cartItem.pcs ? cartItem.pcs : 1}
          />
          <Button
            onClick={() => {
              addToCart(cartItem);
            }}
            title="+"
          />
        </div>
      ))}
      <div className="flex items-center justify-between">
        <Button
          disabled={!cart.length}
          onClick={() => { }}
          title="Završi kupnju"
        />
        <Button
          disabled={!cart.length}
          onClick={() => {
            clearCart();
            onClose();
          }}
          title="Očisti košaricu"
        />
      </div>
    </div>
  </Dialog>
}

export default CartModal;