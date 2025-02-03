import web3 from "./web3";
import contractABI from "./contracts/Voting.json"; // Import ABI

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS; // Load from .env

const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

export default contract;
