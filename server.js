require("dotenv").config();
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { createTable } = require("./queries/key_range_list");
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
	async (err, port) => {
		if (!err) {
			await createTable();
			server.start();
			console.log("Server is running at ", port);
		} else {
			console.error("Couldn't run server ", err);
		}
	}
);

handleExit = async (signal) => {
	console.log(`Received ${signal}. Closing server gracefully.`);
	server.tryShutdown((err) => {
		process.exit(1);
	});
};
process.on("SIGINT", handleExit);
process.on("SIGQUIT", handleExit);
process.on("SIGTERM", handleExit);
