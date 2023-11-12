/// <reference types="cypress"/>

describe('Testes no site www.saucedemo.com', () => {

  it('Caso de teste: Acessar a página inicial e verificar o título', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.title().should('eq', 'Swag Labs');
  });

  it('Caso de teste: Realizar login com sucesso', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.url().should('include', '/inventory.html');
  });

  it('Caso de teste: Adicionar um produto ao carrinho', () => {
    fazerLogin();
    cy.get('.inventory_item').first().find('.btn_inventory').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });

  it('Caso de teste: Remover um produto do carrinho', () => {
    fazerLogin();
    cy.get('.inventory_item').first().find('.btn_inventory').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
    cy.get('.shopping_cart_link').click();
    cy.get('.cart_list').should('have.length', 1);
    cy.get('.cart_item').first().find('.btn_secondary').click();
    cy.get('.cart_item').should('not.exist');
  });

  it('Caso de teste: Tentar realizar login com credenciais inválidas', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('#user-name').type('usuario_invalido');
    cy.get('#password').type('senha_invalida');
    cy.get('#login-button').click();
    cy.get('.error-message-container').should('have.text', 'Epic sadface: Username and password do not match any user in this service');
  });

  it('Caso de teste: Realizar logout', () => {
    fazerLogin();
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();
    cy.get('.login_logo').should('have.text', 'Swag Labs');
  });

});

function fazerLogin() {
  cy.visit('https://www.saucedemo.com/');
  cy.get('#user-name').type('standard_user');
  cy.get('#password').type('secret_sauce');
  cy.get('#login-button').click();
}