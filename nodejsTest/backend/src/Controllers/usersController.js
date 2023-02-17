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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleUser = exports.RequestHandler = exports.getAllUser = void 0;
const _db = new DatabaseHelper();
// Controller to get All User
const RequestHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (yield _db.exec('getAllUser')).recordset;
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.RequestHandler = RequestHandler;
// Get Single User
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield (yield _db.exec('getAllUser')).recordset;
    }
    catch (error) {
    }
});
exports.getSingleUser = getSingleUser;
