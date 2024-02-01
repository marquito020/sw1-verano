import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import auth from "./routes/auth.routes.js";
import users from "./routes/user.routes.js";
import organizers from "./routes/organizer.routes.js";
import photographers from "./routes/photographer.routes.js";
import clients from "./routes/client.routes.js";
import events from "./routes/event.routes.js";
import photos from "./routes/photo.routes.js";
import eventPhotographer from "./routes/eventPhotographer.routes.js";
import photoSale from "./routes/photoSale.routes.js";
import eventClient from "./routes/eventClient.routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", auth);
app.use("/api", users);
app.use("/api", organizers);
app.use("/api", photographers);
app.use("/api", clients);
app.use("/api", events);
app.use("/api", photos);
app.use("/api", eventPhotographer);
app.use("/api", photoSale);
app.use("/api", eventClient);

const PORT = process.env.PORT || 3000;
//192.168.0.58
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
