"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const InMemoryUserRoutes_1 = __importDefault(require("./InMemoryUserRoutes"));
const app = (0, express_1.default)();
const ports = [
    Number(process.env.PORT) || 3000,
    Number(process.env.SECONDARY_PORT) || 3001,
];
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/users', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'test.html'));
});
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/api', InMemoryUserRoutes_1.default);
const start = () => {
    ports.forEach((port) => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    });
};
start();
