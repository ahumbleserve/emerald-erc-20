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

  it("Should have correct name", async function () {
    const { emerald, owner, otherAccount } = await loadFixture(deployFixture);
    const name = await emerald.name();
    expect(name).to.equal("Emerald");
  });

  it("Should have correct symbol", async function () {
    const { emerald, owner, otherAccount } = await loadFixture(deployFixture);
    const symbol = await emerald.symbol();
    expect(symbol).to.equal("EMRLD");
  });

  it("Should have correct decimals", async function () {
    const { emerald, owner, otherAccount } = await loadFixture(deployFixture);
    const decimals = await emerald.decimals();
    expect(decimals).to.equal(18);
  });

  it("Should have correct totalSupply", async function () {
    const { emerald, owner, otherAccount } = await loadFixture(deployFixture);
    const totalSupply = await emerald.totalSupply();
    expect(totalSupply).to.equal(10000n * 10n ** 18n);
  });

  it("Should have get balance", async function () {
    const { emerald, owner, otherAccount } = await loadFixture(deployFixture);
    const balance = await emerald.balanceOf(owner.address)
    expect(balance).to.equal(10000n * 10n ** 18n);
  });

  it("Should transfer", async function () {
    const { emerald, owner, otherAccount } = await loadFixture(deployFixture);
    await emerald.transfer(otherAccount, 1n);

    const balance = await emerald.balanceOf(otherAccount)
    expect(balance).to.equal(1n);
  });

  it("Should NOT transfer", async function () {
    const { emerald, owner, otherAccount } = await loadFixture(deployFixture);
    const instance = emerald.connect(otherAccount);

    await expect(instance.transfer(owner, 1n)).to.be.revertedWith("Insufficient funds");
  });

});
