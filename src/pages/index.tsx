import React, { useEffect, useState } from "react";
import ProductCard from "../app/components/ProductCard";
import ProductModal from "../app/components/ProductModal";
import Pagination from "../app/components/Pagination";
import { getCategories, getProducts, loginUser } from "src/api";
import { Category, Option, Product } from "src/app/types";
import { useCart } from "src/app/context/CartContext";
import Select from "src/app/components/Select";
import Input from "src/app/components/Input";
import Button from "src/app/components/Button";
import LoginFormModal from "src/app/components/LoginFormModal";
import CartModal from "src/app/components/CartModal";

const ProductCatalog = () => {
  const { cart, addToCart, user, loginUser: setUser, logoutUser } = useCart();
  const [products, setProducts] = useState<Product[] | []>([]);
  const [categories, setCategories] = useState<Category[] | []>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | []>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [isCartModalOpen, setCartModalOpen] = useState<boolean>(false);

  const sortOptions: Option[] = [
    { value: "", title: "Sortiraj" },
    { value: "price-asc", title: "Cijena: Najniža - Najviša" },
    { value: "price-desc", title: "Cijena: Najviša - Najniža" },
    { value: "name", title: "Ime (A-Z)" },
  ];

  const priceRangeOptions: Option[] = [
    { value: "", title: "Sve cijene" },
    { value: "10-50", title: "10$ - 50$" },
    { value: "50-100", title: "50$ - 100$" },
    { value: "100", title: "100$+" },
  ];

  const categoryOptions: Option[] = categories.map(category => ({
    value: category.slug, title: category.name
  }));
  categoryOptions.splice(0, 0, { value: "", title: "Sve kategorije" });

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProducts();
      const categoriesData = await getCategories();
      setProducts(productsData);
      setCategories(categoriesData);
      setFilteredProducts(productsData);
    };
    fetchData();
  }, []);

  const applyFilters = () => {
    let updatedProducts: Product[] | [] = products;

    if (selectedCategory) {
      updatedProducts = updatedProducts.filter((product: Product) => product.category === selectedCategory);
    }

    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      updatedProducts = updatedProducts.filter(product =>
        max ? product.price >= min && product.price <= max : product.price >= min
      );
    }

    if (searchTerm) {
      updatedProducts = updatedProducts.filter((product: Product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption) {
      if (sortOption === "price-asc") {
        updatedProducts.sort((a, b) => a.price - b.price);
      } else if (sortOption === "price-desc") {
        updatedProducts.sort((a, b) => b.price - a.price);
      } else if (sortOption === "name") {
        updatedProducts.sort((a, b) => a.title.localeCompare(b.title));
      }
    }

    setFilteredProducts(updatedProducts);
  };

  useEffect(applyFilters, [selectedCategory, priceRange, sortOption, searchTerm, products]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const userData = await loginUser(username, password);
      setUser(userData);
      setLoginModalOpen(false);
    } catch (error) {
      console.log('error: ', error);
      alert("Prijava nije uspjela, pokušajte ponovno.");
    }
  };

  return (
    <div className="p-4">
      <h1>Katalog proizvoda</h1>
      {user ? (
        <>
          <p>Prijavljen kao: {user.username}</p>
          <Button
            className="bg-red-600 text-[#fff]"
            onClick={logoutUser}
            title="Odjavi se"
          />
        </>
      ) : (
        <Button
          onClick={() => setLoginModalOpen(true)}
          title="Prijava"
        />
      )}
      <Button
        className="fixed right-[30px] top-[30px] bg-[#ddd]"
        onClick={() => setCartModalOpen(true)}
        title="Otvori košaricu"
      />
      <br />
      <>
        <Select
          value={selectedCategory}
          onOptionChange={setSelectedCategory}
          options={categoryOptions}
        />
        <Select
          value={priceRange}
          onOptionChange={setPriceRange}
          options={priceRangeOptions}
        />
        <Select
          value={sortOption}
          onOptionChange={setSortOption}
          options={sortOptions}
        />
        <Input
          type="text"
          placeholder="Pretraži po nazivu"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </>

      <div className="product-grid">
        {filteredProducts.slice(currentPage * 20, (currentPage + 1) * 20).map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDetailClick={setSelectedProduct}
            onCartAdd={addToCart}
            disabled={!!cart.find((cartItem: Product) => cartItem.id === product.id)}
          />
        ))}
      </div>

      <Pagination
        total={filteredProducts.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <ProductModal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />

      <LoginFormModal
        isOpen={isLoginModalOpen}
        onHandleLogin={handleLogin}
        onClose={() => setLoginModalOpen(false)}
      />

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setCartModalOpen(false)}
      />
    </div>
  );
};

export default ProductCatalog;
