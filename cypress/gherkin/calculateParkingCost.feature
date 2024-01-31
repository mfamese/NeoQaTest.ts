Feature: PARKING COST CALCULATOR

    Background:
        Given a user visits the parking cost calculator url

    Scenario: Verify 4hrs parking cost for a economy lot parking
        And fills all required informations for 4hrs parking
        When the user clicks the calculate buton
        Then the estimated cost for 4hrs economy lot parking should be dispalyed

    Scenario: Verify 12hrs parking cost for a varlet parking
        And fills all required informations for 8hrs parking
        When the user clicks the calculate buton
        Then the estimated cost for 12hrs valet parking should be dispalyed

    Scenario: Verify 1 day parking cost for a short-term parking
        And fills all required informations for a day parking
        When the user clicks the calculate buton
        Then the estimated cost for 1day short-term parking should be dispalyed