"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const mongo_filter_1 = require("./exception-filters/mongo.filter");
require("colors");
const cors = require("cors");
const path_1 = require("path");
async function bootstrap() {
    var _a;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cors());
    app.useGlobalFilters(new mongo_filter_1.MongoExceptionFilter());
    app.useStaticAssets((0, path_1.join)(__dirname, "..", "public"));
    await app.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000, () => {
        var _a;
        console.log(`Server running on port ${(_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000}`.blue);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map