Feature: Test online calculator scenarios
Scenario: Test subtraction 
Given Open chrome browser and start application
When I enter following values and do the subtraction
            | value1 | 30 |
            | value2 | 20 |
            | operator | - |            
Then I should be able to see
            | expected | 10 |

Scenario: Test division 

Given Open chrome browser and start application
When I enter following values and do the division
            | value1 | 300 |
            | value2 | 10 |
            | operator | / |            
Then I should be able to see
            | expected | 30 |

Scenario: Test CE button 

Given Open chrome browser and start application
When I click CE button            
Then I should be able to see
            | expected | 0 |