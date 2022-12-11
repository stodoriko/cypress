const bookFirst = {
    title: "Московский клуб",
    description:
        "Когда-то Москва была столицей великой страны, потом она стала Анклавом, одним из многих. Теперь ее тайны могут спасти прижатый к стенке мир. Мир, в котором властвует Цифра, нанотехнологии и генная инженерия позволяют добиваться невероятных результатов, а могущественные корпорации соперничают с одряхлевшими государствами. Мир, который отчаянно пытается найти дорогу в будущее. Мир в котором борьба за власть достигла апогея.",
    author: "Вадим Панов",
};

const bookSecond = {
    title: "Лучший экипаж солнечной",
    description:
        "Им надоело стрелять, но это единственное, что они умеют делать хорошо. Рано или поздно команда «К бою!» раздастся снова…",
    author: "Олег Дивов",
};

const bookThird = {
    title: "Психология влияния",
    description:
        "Какие факторы заставляют одного человека говорить другому «да»? И какие методы наиболее эффективны, если необходимо добиться чужого согласия?",
    author: "Роберт Чалдини",
};

describe("Favorite book spec", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.login("test@test.com", "test");
    });

    // it("Valid login", () => {
    //   cy.contains("test@test.com").should("be.visible");
    //   cy.contains("Add new").should("have.class", "btn");
    // });

    it("Should add new book", () => {
        cy.addBook(bookFirst);
        cy.get(".card-title").should("contain.text", bookFirst.title);
    });

    it("Should add new book to favorite", () => {
        cy.addFavoriteBook(bookSecond);
        cy.visit("/favorites");
        cy.get(".card-title").should("contain.text", bookSecond.title);
    });

    it("Should add book to favorite through 'Book list' page", () => {
        cy.addBookNoFavorite(bookFirst);
        cy.contains(bookFirst.title)
            .should("be.visible")
            .within(() => cy.get(".card-footer > .btn").click({ force: true }));
        cy.visit("/favorites");
        cy.contains(bookFirst.title).should("be.visible");
    });

    it("Should delete book from favorite", () => {
        cy.visit("/favorites");
        cy.contains(bookSecond.title)
            .should("be.visible")
            .within(() => cy.get(".card-footer > .btn").click({ force: true }));
        cy.contains(bookSecond.title).should("not.exist");
    });
});