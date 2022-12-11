const {generateName} = require("../fixtures/data");
const {mail, password} = require("../fixtures/login_data.json");

const bookDescription = "Вы можете прочитать хорошую книгу";
const bookAuthors = "Хороший автор";

it("Should login successfuly", () => {
    cy.contains('Books list');
    cy.login(mail, password);
    cy.contains('Добро пожаловать test@test.com').should("be.visible");
});

it("Should not login with empty email", () => {
    cy.login(" ", password);
    cy.get('#mail').then($el => $el[0].checkValidity()).should("be.false");
});

it("Should not login with empty password", () => {
    cy.contains('Books list');
    cy.contains('Log in').click();
    cy.get('#mail').type(mail);
    cy.contains('Submit').click();
    cy.get('#pass').then($el => $el[0].checkValidity()).should("be.false");
});

it("Should create new book", () => {
    const bookName = generateName(10);
    cy.login(mail, password);
    cy.createNewBook(bookName, bookDescription, bookAuthors);
    // check that book exists in books list
    cy.contains(bookName);
});

it("Should add book in favorites during creation", () => {
    const bookName = generateName(10);
    cy.login(mail, password);
    cy.addNewBookToFavoritesDuringCreation(bookName, bookDescription, bookAuthors);
    // убеждаемся, что книга создана
    cy.contains(bookName);
    // переходим в избранное и убеждаемся, что данная книга там есть
    cy.checkThatBookExistsInFavorites(bookName);
});

it("Should add new book to favorite in Books List Page ", () => {
    const bookName = generateName(10);
    cy.login(mail, password);
    cy.createNewBook(bookName, bookDescription, bookAuthors);
    cy.contains(bookName);
    cy.addToFavorite(bookName);
    // переходим в избранное и убеждаемся, что данная книга там есть
    cy.checkThatBookExistsInFavorites(bookName);
});

it("Should delete book from favorites in Favorites Page", () => {
    const bookName = generateName(10);
    cy.login(mail, password);
    cy.createNewBook(bookName, bookDescription, bookAuthors);
    cy.contains(bookName);
    cy.addToFavorite(bookName);
    // переходим в избранное и убеждаемся, что данная книга там есть
    cy.checkThatBookExistsInFavorites(bookName);
    // удаление книги из избранного в Избранных
    cy.deleteBookFromFavorites(bookName, "Favorites");
    // убеждаемся, что книги нет в избранных
    cy.wait(3000);
    cy.contains(`${bookName}`).should('not.exist');
});

it("Should delete book from favorites in Books list Page", () => {
    const bookName = generateName(10);
    cy.login(mail, password);
    cy.createNewBook(bookName, bookDescription, bookAuthors);
    cy.contains(bookName);
    cy.addToFavorite(bookName);
    // переходим в избранное и убеждаемся, что данная книга там есть
    cy.checkThatBookExistsInFavorites(bookName);
    // удаление книги из избранного в Books list
    cy.deleteBookFromFavorites(bookName, "Books list");
    // убеждаемся, что книги нет в избранных
    cy.wait(3000);
    cy.contains('Favorites').click();
    cy.contains(`${bookName}`).should('not.exist');
});