import { OrderSystem } from './OrderSystem';

const integrationTest = async () => {
    console.log('Running integration tests...');

    OrderSystem.AddOrder('Apple', 20, 2);
    OrderSystem.AddOrder('Banana', 15, 3);
    
    if (OrderSystem.Checkout() === 85) {
        console.log('Test case 1 passed');
    } else {
        console.log('Test case 1 failed');
        process.exit(1);
    }

    try {
        OrderSystem.AddOrder('Orange', 30, -5); 
        console.log('Test case 2 failed');
        process.exit(1);
    } catch {
        console.log('Test case 2 passed');
    }
};

integrationTest();