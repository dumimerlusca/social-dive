import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MongoExceptionFilter } from "./exception-filters/mongo.filter";
import "colors";
import * as cors from "cors";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AuthGuard } from "./guards/auth.guard";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.use(cors());
	app.useGlobalFilters(new MongoExceptionFilter());
	app.useStaticAssets(join(__dirname, "..", "public"));

	await app.listen(process.env.PORT ?? 5000, () => {
		console.log(`Server running on port ${process.env.PORT ?? 5000}`.blue);
	});
}
bootstrap();
