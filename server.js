require("dotenv").config();
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { setRange } = require("./counter_store/actions");
const { createTable } = require("./db/query");
const packageDefinition = protoLoader.loadSync("proto/key.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const KeyPackage = grpcObject.KeyPackage;

const server = new grpc.Server();
const PORT = process.env.PORT || 6000;

server.addService(KeyPackage.Key.service, {
	GetKeys: require("./handlers/getKeys"),
});

server.bindAsync(
	"0.0.0.0:" + PORT,
	grpc.ServerCredentials.createInsecure(),
	(err, port) => {
		if (!err) {
			server.start();
			console.log("Server is running at ", port);
			createTable();
		} else {
			console.error("Couldn't run server ", err);
		}
	}
);

handleExit = async (signal) => {
	console.log(`Received ${signal}. Closing server gracefully.`);
	server.tryShutdown((err) => {
		process.exit(0);
	});
};
process.on("SIGINT", handleExit);
process.on("SIGQUIT", handleExit);
process.on("SIGTERM", handleExit);
