"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 3000;
const mongoURI = process.env.MONGODB_URI;
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'test.html'));
});
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/api', UserRoutes_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoURI) {
        throw new Error('MONGODB_URI is required');
    }
    yield mongoose_1.default.connect(mongoURI);
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
start().catch((error) => {
    console.error('Error starting server:', error);
    process.exitCode = 1;
});
