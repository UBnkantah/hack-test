// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract DonateFunds {
    address public admin;
    address[] public ListOfDonors;
    address public beneficiary;
    bool public isPaused;

    struct Donation {
        uint amount;
        uint time;
    }

    mapping(address => uint) public donorBalance;
    mapping(address => Donation[]) public donations;

    constructor(address _beneficiary) {
        admin = msg.sender;
        beneficiary = _beneficiary;
    }

    modifier onlyAdmin() {
        if (msg.sender != admin) {
            revert();
        }
        _;
    }

    modifier isRunning() {
        require(!isPaused, "Contract is Paused");
        _;
    }

    function pause() public onlyAdmin isRunning {
        isPaused = true;
    }

    function resume() public onlyAdmin {
        require(isPaused);
        isPaused = false;
    }

    function Donate() public payable isRunning {
        donorBalance[msg.sender] += msg.value;
        uint index = donations[msg.sender].length;
        donations[msg.sender].push(Donation(msg.value, block.timestamp));

        if(index == 0){
            ListOfDonors.push(msg.sender);
        }

    }

    function Withdraw() public payable isRunning onlyAdmin {
        (bool success, ) = beneficiary.call{value: address(this).balance}("");
        require(success);
    }

    function viewDonation() public view returns (uint) {
        return address(this).balance;
    }
}
