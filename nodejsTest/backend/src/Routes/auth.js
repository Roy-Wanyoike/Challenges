"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../Controllers/auth");
const authrouter = (0, express_1.Router)();
authrouter.post('/register', auth_1.RegisterUser);
authrouter.post('/login', auth_1.loginUser);
exports.default = authrouter;
