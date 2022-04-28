/// <reference types="Cypress" />

describe('Central de atendimento TAT', function(){
    beforeEach(() => cy.visit('./src/index.html'));
    
    it('Verifica título da aplicação', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });

    it('preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName').type('John');
        cy.get('#lastName').type('Lennon');
        cy.get('#email').type('comeTogether@gmail.com');
        cy.get('#open-text-area').type('come together, right now... Over Me!',{delay: 0});
        cy.get('.button').click();

        cy.clock()
        cy.get('.success').should('be.visible');
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('John');
        cy.get('#lastName').type('Lennon');
        cy.get('#email').type('comeTogether-gmail.com');
        cy.get('#open-text-area').type('come together, right now... Over Me!',{delay: 0});
        cy.get('.button').click();
        cy.get('.error').should('be.visible');
    });

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
        cy.get('#phone')
          .type('pabloqwer')
          .should('have.value', '');
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('John');
        cy.get('#lastName').type('Lennon');
        cy.get('#email').type('comeTogether@gmail.com');
        cy.get('#open-text-area').type('come together, right now... Over Me!',{delay: 0});
        cy.get('#phone-checkbox')
          .check()
          .should('be.checked');
        cy.get('.phone-label-span').should('be.visible');
        cy.get('.button').click();
        cy.get('.error').should('be.visible');
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
          .type('Kassandra')
          .should('have.value', 'Kassandra')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('of Sparta')
          .should('have.value', 'of Sparta')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('spartan@gmail.com')
          .should('have.value', 'spartan@gmail.com')
          .clear()
          .should('have.value', '')
        cy.get('#phone')
          .type('999998888')
          .should('have.value', '999998888')
          .clear()
          .should('have.value', '')
        cy.get('#open-text-area')
          .type('UUUUUOOBA')
          .should('have.value', 'UUUUUOOBA')
          .clear()
          .should('have.value', '')
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    });

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('utilizar identificação do elemento button usando cy.contains', function(){
        cy.fillMandatoryFields()
        cy.contains('.button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
      cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
      cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
    })

   Cypress._.times(4, () =>{
    it('marca o tipo de atendimento "Feedback"', function(){
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('be.checked')
    })
   })

    it('marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('be.checked')
      cy.get('input[type="radio"][value="elogio"]')
        .check()
        .should('be.checked')
      cy.get('input[type="radio"][value="ajuda"]')
        .check()
        .should('be.checked')
    })

    it('marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(($radio) =>{
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
    })

    Cypress._.times(3, () =>{
      it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')
      });
    });

    it('seleciona um arquivo da pasta fixtures', function(){
      cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        
      cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe a mensagem por 3 segundos', function(){
      cy.clock();
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')
      cy.tick(3000)
      cy.get('.success').should('not.be.visible')
    })

  Cypress._.times(5, () => {
    it('submeter form com sucesso', () => {
      cy.clock();
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')
      cy.tick(3000)
      cy.get('.success').should('not.be.visible')
    });
  });
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () =>{
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    });
    it('preenche a area de texto usando o comando invoke', () =>{
      const longText = Cypress._.repeat('1234567890', 20)

      cy.get('#open-text-area')
        .invoke('val', longText)
        .should('have.value', longText)
    });

    it('faz uma requisição HTTP', () =>{
      cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should((response) =>{
          const { status, statusText, body } = response
          expect(status).to.equal(200)
          expect(statusText).to.equal('OK')
          expect(body).to.include('CAC TAT')
        })
    });

    it.only('encontra o gato escondido', () =>{
      cy.get('#cat')
        .invoke('show')
        .should('be.visible')
    })
})