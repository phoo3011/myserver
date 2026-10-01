function calculateTotalCost(price: number, quantity: number): number {
    return price * quantity;
}

interface OrderItem {
    name: string;
    price: number;
    quantity: number;
}

let orderList: OrderItem[] = [];

function AddOrder(name: string, price: number, quantity: number) {
    if (price < 0) {
        throw new Error('Invalid price');
    }
    if (quantity <= 0) {
        throw new Error('Invalid quantity');
    }
    orderList.push({ name, price, quantity });
}

function Checkout() {
    let totalCost = 0;
    for (let item of orderList) {
        totalCost += calculateTotalCost(item.price, item.quantity);
    }
    orderList = [];
    return totalCost;
}

export const OrderSystem = {
    calculateTotalCost,
    AddOrder,
    Checkout
};