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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const database_1 = require("./database");
class CategoryService {
    constructor() { }
    static getCategoriesByUserIdFromDb(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cursor = this.categoryCollection.find({
                    user_id: user_id,
                });
                const categories = [];
                yield cursor.forEach((category) => {
                    categories.push(category);
                });
                return categories;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getCategoryByIdFromDb(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield this.categoryCollection.findOne({ _id });
                return category;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static createCategoryInDb(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.categoryCollection.insertOne(category);
                const categoryCreated = yield this.categoryCollection.findOne({
                    _id: result.insertedId,
                });
                return categoryCreated;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static updateCategoryInDb(_id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryUpdated = yield this.categoryCollection.findOneAndUpdate({ _id }, {
                    $set: {
                        name,
                    },
                }, {
                    returnDocument: 'after',
                });
                return categoryUpdated.value;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static deleteCategoryInDb(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.categoryCollection.deleteOne({ _id });
                return result.deletedCount;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.CategoryService = CategoryService;
_a = CategoryService;
CategoryService.db = database_1.Database.instance;
CategoryService.categoryCollection = _a.db.useCollection('categories');
