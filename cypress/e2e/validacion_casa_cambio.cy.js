const URL = 'http://127.0.0.1:8080';
const fecha = '2016-04-19';
const moneda = 'USD';
const mensaje = 'Cargando tipos de cambio... ';

describe('Casa de cambio', () => {
  beforeEach('Visita la web', () => {
    cy.visit(URL);
    cy.get('#tipos-cambio').should('be.visible');
    cy.get('#fecha-input').should('be.visible');
    cy.get('#buscar-btn').should('be.visible');
    cy.get('#borrar-btn').should('be.visible');

  });

  it('Elige moneda, fecha y verifica el resultado', () => {
    cy.get('#tipos-cambio').select(moneda);
    cy.get('#fecha-input').type(fecha);
    cy.get('#buscar-btn').click().should('be.disabled');
    cy.get('#mensaje').should('have.text',mensaje)
    cy.get('#lista-cambios').find('li').should('have.length.greaterThan', 0);
    cy.get('#borrar-btn').click()
    cy.get('#buscar-btn').should('be.enabled');
    cy.get('#lista-cambios').should('be.empty');
    
  });

});
