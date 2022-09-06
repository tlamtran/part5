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
            cy.login({ username: 'testusername', password: 'testpassword' })
            cy.contains('test logged in')
        })

        it('Login unsuccesful', function() {
            cy.login({ username: 'wrong', password: 'wrong' })
            cy.contains('Wrong username or password')
        })
    })

    describe('When logged in', function() {
        beforeEach(() => {
            cy.login({ username: 'testusername', password: 'testpassword' })
        })

        it('A blog can be created', function() {
            cy.create({
                title: 'testtitle',
                author: 'testauthor',
                url: 'testurl'
            })
            cy.contains('testtitle testauthor')
        })

        it('Can like a blog', function() {
            cy.create({
                title: 'testtitle',
                author: 'testauthor',
                url: 'testurl'
            })
            cy.get('#show-button').click()
            cy.get('.likeButton').click()
            cy.contains('likes 1')
        })

        it('Can remove own blog', function() {
            cy.create({
                title: 'testtitle',
                author: 'testauthor',
                url: 'testurl'
            })
            cy.get('#show-button').click()
            cy.contains('remove').click()
            cy.contains('testtitle testauthor').should('not.exist')
        })
    })
})