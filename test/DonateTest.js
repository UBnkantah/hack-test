const { expect } = require("chai");

describe("DonateFunds", function () {
  let donateFunds;
  let deployer, beneficiary, alice, bob;

  before(async function () {
    [deployer, beneficiary, alice, bob] = await ethers.getSigners();
    const DonateFunds = await ethers.getContractFactory("DonateFunds");
    donateFunds = await DonateFunds.deploy(beneficiary.address);
  });

  it("should deploy the contract correctly", async function () {
    // Your deployment test logic here
    let contractBeneficiary = await donateFunds.beneficiary();
    expect(beneficiary.address).to.equal(contractBeneficiary);
  });

  it("should allow donations and update balances", async function () {
    // Your donation test logic here

    // get contract balance and expect it to be 0
    let old_balance = await donateFunds.viewDonation();
    expect(old_balance).to.be.equal(0);

    // Connect as alice and donate 1 ether to the contract
    await donateFunds.connect(alice).Donate({ value: 1e18 });

    // Get contract balance and expect it to be equal to the donated value
    let new_balance = await donateFunds.viewDonation();
    expect(new_balance).to.be.equal(1e18);

    // Expect alice donation balance to be updated
    let alice_donation = await donateFunds.donorBalance(alice);
    expect(alice_donation).to.be.equal(1e18);

    // Fetch all donorts and expect alice to be the only one in it
    let list_of_donors = await donateFunds.ListOfDonors();

    expect(list_of_donors.length).to.be.equal(1);
    expect(list_of_donors).includes(alice.address);
  });

  it("should not allow withdrawals from anyone that isn't an admin", async function () {
    // Your withdrawal test logic here
    let withdraw = donateFunds.connect(bob).Withdraw();

    expect(withdraw).to.be.reverted;
  });

  it("should allow withdrawals by the admin and send to beneficiary", async function () {
    // Your withdrawal test logic here
    let bene_old_balance = await ethers.getBalance(beneficiary.address);
    await donateFunds.connect(deployer).Withdraw();
    let balance = await donateFunds.viewDonation();
    expect(balance).to.be.equal(0);

    let bene_new_balance = await ethers.getBalance(beneficiary.address);
    expect(bene_new_balance).to.be.equal(balance + bene_old_balance);
  });
});
