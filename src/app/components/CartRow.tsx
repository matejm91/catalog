type CartRow = {
  title: string,
  price: number,
  pcs: number
}

const CartRow = ({ title, price, pcs }: CartRow) => {
  return <>
    {title} / {price}$ - Ukupno - ({pcs}pcs) - ({pcs  * price}$)
  </>
}

export default CartRow;