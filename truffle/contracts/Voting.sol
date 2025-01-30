// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public chairperson;
    mapping(address => bool) public hasVoted;
    mapping(address => uint256) public votes;
    string[] public candidates;
    address[] public voters; // Stores the addresses of voters
    uint256 public candidateCount;

    event VoteCast(address voter, uint256 candidateIndex);
    event CandidateAdded(string name);

    modifier onlyChairperson() {
        require(msg.sender == chairperson, "Only the chairperson can perform this action.");
        _;
    }

    constructor(string[] memory _candidates) {
        chairperson = msg.sender;
        candidateCount = _candidates.length;
        for (uint i = 0; i < _candidates.length; i++) {
            candidates.push(_candidates[i]);
        }
    }

    function addCandidate(string memory _name) public onlyChairperson {
        candidates.push(_name);
        candidateCount++;
        emit CandidateAdded(_name);
    }

    function vote(uint256 _candidateIndex) public {
        require(!hasVoted[msg.sender], "You have already voted.");
        require(_candidateIndex < candidateCount, "Invalid candidate index.");
        
        votes[msg.sender] = _candidateIndex;
        hasVoted[msg.sender] = true;
        voters.push(msg.sender); // Store voter address
        
        emit VoteCast(msg.sender, _candidateIndex);
    }

    function getCandidateVotes(uint256 _candidateIndex) public view returns (uint256) {
        require(_candidateIndex < candidateCount, "Invalid candidate index.");
        
        uint256 voteCount = 0;
        for (uint i = 0; i < voters.length; i++) {
            if (votes[voters[i]] == _candidateIndex) {
                voteCount++;
            }
        }
        return voteCount;
    }

    function getCandidateName(uint256 _index) public view returns (string memory) {
        require(_index < candidateCount, "Invalid candidate index");
        return candidates[_index];
    }
}
