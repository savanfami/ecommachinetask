import * as server from './app'
import { connectDB } from './config/connection';
(async () => {
    try {
        server;
        await connectDB();
    } catch (error) {
        console.error("issues in running server:", error);
        throw new Error("issues in running server");
    } finally {
        process.on("SIGINT", async () => {
            console.log("server shutting down");
            process.exit();
        });
    }
})();


