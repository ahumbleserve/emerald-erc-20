import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Emerald Tests", function () {

  async function deployFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Emerald = await hre.ethers.getContractFactory("Emerald");
    const emerald = await Emerald.deploy();

    return { emerald, owner, otherAccount };
  }

  it("Should test", async function () {
      const { emerald, owner, otherAccount } = await loadFixture(deployFixture);

      expect(true).to.equal(true);
  });



});
