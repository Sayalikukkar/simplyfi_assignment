# Chaincode Developement for storing the data in javascript using Hyperledger Fabric

## Fabric Network configuration
### Prerequisite
Follow the instructions given in the link to install necessary tools and to configure the system: https://hyperledger-fabric.readthedocs.io/en/latest/prereqs.html

### Bring up the network
Follow the instructions to successfully setup the network.

1. Change the working directory to /fabric-samples/pdm-network
```bash
$ cd ../fabric-samples/test-network
```

1. Use the following command to start the network, with 2 organization org1 and org2 with one peer each (peer0) and an Orderer node.
```bash
$ ./network.sh createChannel -ca -s couchdb
```

3. Deploy the chaincode.
**Note: If default channel name is not used then the following command applies, else remove the channel arguments (-c) and run the command.**
```bash
$ ./network.sh deployCC -ccn basic_updated -ccp ../chaincode/chaincode-javascript -ccl javascript
```
This command will deploy a javascript chaincode on mychannel

4. Use this command to bring the network down
```bash
$ ./network.sh down
```
