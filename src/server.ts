import { Server } from "http";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const statServer = async () => {
  try {
    server = app.listen(envVars.PORT, () => {
      console.log(`Server is runnig at port: `, envVars.PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

// server starter
(async () => {
  await statServer();
})();

// signal termination or sigterm
process.on("SIGTERM", () => {
  console.log("Signal termination detected... server is shuting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// sigint
process.on("SIGINT", () => {
  console.log("Singint detected... server is shuting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// promise rejection error
process.on("unhandledRejection", (error) => {
  console.log(`Unhandled Rejection detected...
        Error: ${error}
        server is shuting down..`);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// try catch error
process.on("uncaughtException", (error) => {
  console.log(`Uncaught Exception detected...
        Error: ${error}
        server is shuting down..`);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
