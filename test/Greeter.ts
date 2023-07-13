import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import GreeterArtifact from "../artifacts/contracts/supplyChain.sol/supplyChain.json";
import { SupplyChain } from "../frontend/src/typechain";

const { deployContract } = waffle;

describe("Greeter tests", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployOnceFixture() {
    let greeter: SupplyChain;
    // Contracts are deployed using the first signer/account by default
    const [owner, ...otherAccounts] = await ethers.getSigners();

    greeter = (await deployContract(owner, GreeterArtifact)) as SupplyChain;

    return { greeter, owner, otherAccounts };
  }

  describe("Test suite", function () {
    it("Check if intiated with hello world", async function () {
      const { greeter } = await loadFixture(deployOnceFixture);

      expect(await greeter.totalOrders()).to.be.eq(1);
    });

    // it("Check if greet can be updated", async function () {
    //   const { greeter, owner } = await loadFixture(deployOnceFixture);
    //   let tx = await greeter.connect(owner).setGreeting("Hello, universe!");
    //   (await tx).wait();
    //   expect(await greeter.greet()).to.be.eq("Hello, universe!");
    // });

    // it("Check if not owner cant change greet", async function () {
    //   const { greeter, owner, otherAccounts } = await loadFixture(
    //     deployOnceFixture
    //   );
    //   await expect(
    //     greeter.connect(otherAccounts[0]).setGreeting("Hello, universe!")
    //   ).to.be.reverted;
    // });
  });
});
