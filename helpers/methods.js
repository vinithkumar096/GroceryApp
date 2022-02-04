import uuid from "uuid";
import { getFileInfo, readFile, writeFile } from "./storage";
import products from "../data/products.json";
import users from "../data/users.json";

// Create
export async function addUser(data, onSuccess=null, onError=null){
    try {
        const users_ = await getAllUsers();
        await writeFile("users.json", [data, ...users_])
        onSuccess?.("User added successfully!")
    } catch (e) {
        console.log(e)
        onError?.(e)
    }
}
export async function addProduct(data, onSuccess=null, onError=null){
    try {
        const productss = await getAllProducts();
        await writeFile("products.json", [{...data, id: uuid.v4()}, ...productss])
        onSuccess?.("Product added successfully!")
    } catch (e) {
        console.log(e)
        onError?.(e)
    }
}
export async function addOrder(email, cart, onSuccess=null, onError=null){
    const order = {
        id: uuid.v4(),
        user: email,
        time: (new Date()).toString(),
        products: cart,
        status: "placed",
    }
    try {
        const orders = await getAllOrders();
        await writeFile("orders.json", [order, ...orders])
        onSuccess?.("Order added successfully!")
    } catch (e) {
        console.log(e)
        onError?.(e)
    }
}
// Read
export async function getAllUsers(onSuccess=null, onError=null){
    try {
        const fileInfo = await getFileInfo("users.json")
        if (!fileInfo.exists) {
            await writeFile("users.json", users)
        }
        const data = await readFile("users.json")
        onSuccess?.(data)
        return data
    } catch (e){
        console.log(e)
        onError?.(e)
    }
}
export async function getAllProducts(onSuccess=null, onError=null){
    try {
        const fileInfo = await getFileInfo("products.json")
        if (!fileInfo.exists) {
            await writeFile("products.json", products)
        }
        const data = await readFile("products.json")
        onSuccess?.(data)
        return data
    } catch (e){
        onError?.(e)
    }
}
export async function getUser(email, onSuccess=null, onError=null){
    try {
        const user = (await getAllUsers()).filter(user => user.email === email)
        if (user.length === 1) {
            onSuccess?.(user[0])
            return user[0]
        } else onError?.("User not found")
    } catch (e) {
        console.log(e)
        onError?.(e)
    }
}
export async function getProduct(id, onSuccess=null, onError=null){
    try {
        const product = (await getAllProducts()).filter(product => product.id === id)
        if (product.length === 1) {
            onSuccess?.(product[0])
            return product[0]
        } else onError?.("Product not found")
    } catch (e) {
        console.log(e)
        onError?.(e)
    }
}
export async function getOrder(id, onSuccess=null, onError=null){
    try {
        const order = (await getAllOrders()).filter(order => order.id === id)
        if (product.length === 1) {
            onSuccess?.(product[0])
            return product[0]
        } else onError?.("Order not found")
    } catch (e) {
        console.log(e)
        onError?.(e)
    }
}
export async function getFruits(onSuccess=null, onError=null){
    try {
        const products_ = await getAllProducts();
        onSuccess?.(products_.filter(product => product.category === 'fruits'))
    } catch (e) {
        onError?.(e);
    }
}
export async function getVegetables(onSuccess=null, onError=null){
    try {
        const products_ = await getAllProducts();
        onSuccess?.(products_.filter(product => product.category === 'vegetables'))
    } catch (e) {
        onError?.(e)
    }
}
export async function getAllOrders(onSuccess=null, onError=null){
    try {
        const fileInfo = await getFileInfo("orders.json")
        if (!fileInfo.exists) {
            await writeFile("orders.json", [])
        }
        const data = await readFile("orders.json")
        onSuccess?.(data)
        return data
    } catch (e){
        onError?.(e)
    }
}
export async function getMyOrders(email, onSuccess=null, onError=null){
    try {
        const orders = (await getAllOrders()).filter(order => order.user === email)
        onSuccess?.(orders)
        return orders
    } catch (e) {
        onError?.(e);
    }
}
// Update
export async function updateProduct(id, data, onSuccess=null, onError=null){
    try {
        const others = (await getAllProducts()).filter(product => product.id !== id);
        const product = await getProduct(id);
        const updated = { ...product, ...data };
        await writeFile("products.json", [updated, ...others])
        onSuccess?.("Updated successfully!");
    } catch (e) {
        console.log(e);
        onError?.(e);
    }
}
export async function updateOrder(id, data, onSuccess=null, onError=null){
    try {
        const others = (await getAllOrders()).filter(order => order.id !== id);
        const order = (await getAllOrders()).filter(order => order.id === id)[0];
        const updated = { ...order, ...data };
        await writeFile("orders.json", [updated, ...others])
        onSuccess?.("Updated successfully!");
    } catch (e) {
        console.log(e);
        onError?.(e);
    }
}
// Delete
export async function deleteProduct(id, onSuccess = null, onError = null){
    try {
        const products = (await getAllProducts()).filter(product => product.id !== id);
        await writeFile("products.json", products);
        onSuccess?.("Deleted successfully!");
    } catch (e){
        console.log(e)
        onError?.(e);
    }
}
export async function deleteOrder(id, onSuccess = null, onError = null){
    try {
        const orders = (await getAllOrders()).filter(order => order.id !== id);
        await writeFile("orders.json", orders);
        onSuccess?.("Deleted successfully!");
    } catch (e){
        console.log(e)
        onError?.(e);
    }
}