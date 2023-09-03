const { expect } = require("chai");

describe("DonateFunds", function () {
    let donateFunds;
    let deployer, beneficiary, alice, bob;

    before(async function() {
        [deployer, beneficiary, alice, bob] = await ethers.getSigners();
        const DonateFunds = await ethers.getContractFactory("DonateFunds");
        donateFunds = await DonateFunds.deploy(beneficiary.address);
    
    });

  it("should deploy the contract correctly", async function () {
    // Your deployment test logic here
    let contractBeneficiary = await donateFunds.beneficiary()
    expect(beneficiary.address).to.equal(contractBeneficiary)
  });

  it("should allow donations and update balances", async function () {
    // Your donation test logic here
    await donateFunds()
  })

  it("should allow withdrawals by the admin", async function () {
    // Your withdrawal test logic here
  });

  it("should handle emergencies correctly", async function () {
    // Your emergency handling test logic here
  });
})