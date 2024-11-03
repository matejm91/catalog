import axios from "axios";

export const getProducts = async () => {
    const response = await axios.get("https://dummyjson.com/products");
    return response.data.products;
};

export const getCategories = async () => {
    const response = await axios.get("https://dummyjson.com/products/categories");
    return response.data;
};

export const loginUser = async (username: string, password: string) => {
    const response = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
    });
    return response.data;
};