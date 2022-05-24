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
const mongoose = require('mongoose');
const config_1 = __importDefault(require("../config/config"));
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield mongoose.connect(`mongodb://${config_1.default.MONGO_HOST}/${config_1.default.MONGO_DATABASE}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            user: config_1.default.MONGO_USER,
            pass: config_1.default.MONGO_PASSWORD
        })
            .then((dbCon) => {
            console.log('DB Online');
        })
            .catch((err) => {
            console.error('Error connecting to mongo', err);
        });
    }
    catch (error) {
        throw new Error('Error a la hora de inicializad DB');
    }
});
module.exports = {
    dbConnection,
};