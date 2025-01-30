// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public chairperson;
    mapping(address => bool) public hasVoted;
    mapping(address => uint256) public votes;
    mapping(uint256 => uint256) public candidateVotes; // Store votes directly
    string[] public candidates;
    uint256 public candidateCount;

    event VoteCast(address indexed voter, uint256 candidateIndex);
    event VoterAdded(address indexed voter);

    constructor(string[] memory _candidates) {
        chairperson = msg.sender;
        candidateCount = _candidates.length;
        for (uint i = 0; i < _candidates.length; i++) {
            candidates.push(_candidates[i]);
        }
    }

    function addVoter(address _voter) public onlyChairperson {
        emit VoterAdded(_voter);
    }

    function vote(uint256 _candidateIndex) public {
        require(!hasVoted[msg.sender], "You have already voted.");
        require(_candidateIndex < candidateCount, "Invalid candidate index.");

        votes[msg.sender] = _candidateIndex;
        hasVoted[msg.sender] = true;
        candidateVotes[_candidateIndex]++; // Increment candidate's vote count

        emit VoteCast(msg.sender, _candidateIndex);
    }

    function getCandidateVotes(uint256 _candidateIndex) public view returns (uint256) {
        require(_candidateIndex < candidateCount, "Invalid candidate index.");
        return candidateVotes[_candidateIndex]; // Directly return count
    }

    function getCandidateName(uint256 _index) public view returns (string memory) {
        require(_index < candidateCount, "Invalid candidate index");
        return candidates[_index];
    }

    modifier onlyChairperson() {
        require(msg.sender == chairperson, "Only the chairperson can perform this action.");
        _;
    }
}
