describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            username: 'testusername',
            password: 'testpassword',
            name: 'test'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('log in to application')
    })

    describe('Login', function() {
        it('Login succesful', function() {
            cy.get('#username').type('testusername')
            cy.get('#password').type('testpassword')
            cy.get('#login-button').click()
            cy.contains('test logged in')
        })

        it('Login unsuccesful', function() {
            cy.get('#username').type('incorrect')
            cy.get('#password').type('incorrect')
            cy.get('#login-button').click()
            cy.contains('Wrong username or password')
        })
    })
})