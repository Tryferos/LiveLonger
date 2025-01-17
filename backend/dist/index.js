"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAIN_PATH = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("./types/extensions");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const middleware_1 = require("./middleware");
const routes_1 = require("./routes");
require("./database");
const path_1 = __importDefault(require("path"));
const Routes_1 = require("./constants/Routes");
const app = (0, express_1.default)();
const port = process.env.PORT ?? 3000;
exports.MAIN_PATH = path_1.default.join(__dirname);
app.use((0, helmet_1.default)({ contentSecurityPolicy: false, }));
app.use(express_1.default.json({ limit: '4mb', }));
app.use(express_1.default.urlencoded({ limit: '4mb', extended: true, parameterLimit: 500000 }));
app.use(express_1.default.text());
app.use('/public', express_1.default.static('public'));
app.use(middleware_1.limiter);
app.use(middleware_1.authenticateUser);
app.use(middleware_1.checkAuthentication);
app.use(Routes_1.ROUTES.PATH_INDEX, routes_1.router);
/*
 *  Serve the frontend
*/
app.get('/', (req, res) => {
    res.sendFile('./public/frontend/index.html');
});
app.listen(port, async () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
module.exports = app;
