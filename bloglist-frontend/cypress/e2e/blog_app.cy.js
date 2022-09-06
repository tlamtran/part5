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

        it('Can create a blog', function() {
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

        it('blogs shown in correct order', function() {
            cy.create({
                title: 'second',
                author: 'second',
                url: 'second'
            })
            cy.create({
                title: 'third',
                author: 'third',
                url: 'third'
            })
            cy.create({
                title: 'first',
                author: 'first',
                url: 'first'
            })
            cy.contains('first first').contains('view').click()
            cy.get('.likeButton').filter(':visible').click().click().click()
            cy.contains('hide').click()
            cy.contains('second second').contains('view').click()
            cy.get('.likeButton').filter(':visible').should('be.visible').click().click()
            cy.contains('hide').click()
            cy.wait(500)
            cy.get('.blogContent').eq(0).should('contain', 'first')
            cy.get('.blogContent').eq(1).should('contain', 'second')
            cy.get('.blogContent').eq(2).should('contain', 'third')
        })
    })
})