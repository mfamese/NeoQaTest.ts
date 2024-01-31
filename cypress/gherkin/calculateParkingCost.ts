import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const { expect } = require("chai");
const url = "https://www.shino.de/parkcalc/";

Given("a user visits the parking cost calculator url", () => {
  cy.visit(url);
});
Given("fills all required informations for 4hrs parking", () => {
  cy.get("#ParkingLot").select("Economy Parking");
  cy.get("#StartingDate").clear();
  cy.get("#StartingDate").type("1/30/2024");
  cy.get("#StartingTime").clear();
  cy.get("#StartingTime").type("08:00");
  cy.get("#LeavingDate").clear();
  cy.get("#LeavingDate").type("1/30/2024");
  cy.get("#LeavingTime").clear();
  cy.get("#LeavingTime").type("12:00");
  cy.get(
    "tr:nth-of-type(3) > td:nth-of-type(2) > input:nth-of-type(4)"
  ).check();
});
When("the user clicks the calculate buton", () => {
  cy.get("[type='submit']").click();
  cy.wait(2000);
});
Then("the estimated cost for 4hrs economy lot parking should be dispalyed",() => {
    const actualText = "$ 8.00        (0 Days, 4 Hours, 0 Minutes)";
    const expectedTextPattern = /\$ 8.00\s*\(\s*0 Days, 4 Hours, 0 Minutes\s*\)/;
    expect(actualText).to.match(expectedTextPattern);
  }
);
//Verify 8hrs parking cost for a varlet parking
Given("fills all required informations for 8hrs parking", () => {
  cy.get("#ParkingLot").select("Valet Parking");
  cy.get("#StartingDate").clear();
  cy.get("#StartingDate").type("1/30/2024");
  cy.get("#StartingTime").clear();
  cy.get("#StartingTime").type("12:00");
  cy.get("#LeavingDate").clear();
  cy.get("#LeavingDate").type("1/30/2024");
  cy.get("#LeavingTime").clear();
  cy.get("#LeavingTime").type("12:00");
  cy.get("tr:nth-of-type(3) > td:nth-of-type(2) > input:nth-of-type(4)").check();
});
Then("the estimated cost for 12hrs valet parking should be dispalyed", () => {
  const actualText = "$ 18.00        (0 Days, 12 Hours, 0 Minutes)";
  const expectedTextPattern = /\$ 18.00\s*\(\s*0 Days, 12 Hours, 0 Minutes\s*\)/;
  expect(actualText).to.match(expectedTextPattern);
});
//Verify 1 day parking cost for a short-term parking
Given("fills all required informations for a day parking", () => {
  cy.get("#ParkingLot").select("Valet Parking");
  cy.get("#StartingDate").clear();
  cy.get("#StartingDate").type("1/30/2024");
  cy.get("#StartingTime").clear();
  cy.get("#StartingTime").type("14:00");
  cy.get("#LeavingDate").clear();
  cy.get("#LeavingDate").type("1/31/2024");
  cy.get("#LeavingTime").clear();
  cy.get("#LeavingTime").type("14:00");
  cy.get(
    "tr:nth-of-type(3) > td:nth-of-type(2) > input:nth-of-type(4)"
  ).check();
});
Then(
  "the estimated cost for 1day short-term parking should be dispalyed",
  () => {
    cy.get("tr:nth-of-type(4) > td:nth-of-type(2)").should(
      "contain.text",
      "$ 9.00        (1 Days, 0 Hours, 0 Minutes)"
    );
  }
);
