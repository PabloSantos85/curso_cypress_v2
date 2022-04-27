// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Lennon');
    cy.get('#email').type('comeTogether@gmail.com');
    cy.get('#open-text-area').type('come together, right now... Over Me!');
    cy.get('.button').click();
});

Cypress.Commands.add('fillMandatoryFields', function(){
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Lennon');
    cy.get('#email').type('comeTogether@gmail.com');
    cy.get('#open-text-area').type('come together, right now... Over Me!');
});

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


