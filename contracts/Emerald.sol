// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Emerald {
    
    string public name = "Emerald";
    string public symbol = "EMRLD";
    uint8 public decimals = 18;
    uint256 public totalSupply = 10000 * 10 ** 18;
    mapping (address => uint256) private _balances;
    mapping (address => mapping(address => uint256)) private _approvals;
    
    
    constructor(){
        _balances[msg.sender] = totalSupply;
    }

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _expender, uint256 _value);

    
    function balanceOf(address _owner) public view returns (uint256 balance){
        return _balances[_owner];
    }

    function transfer(address _to, uint256 _value) public returns (bool success){
        require(balanceOf(msg.sender) >= _value, "Insufficient funds");

        _balances[msg.sender] -= _value;
        _balances[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        _approvals[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return _approvals[_owner][_spender];
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        require(balanceOf(_from) >= _value, "Insufficient funds");
        require(allowance(_from, msg.sender) >= _value, "Insufficient allowence");

        _balances[_from] -= _value;
        _approvals[_from][msg.sender] -= _value;
        _balances[_from] += _value;

        emit Transfer(_from, _to, _value);

        return true;
    }


}
