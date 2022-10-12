/// <reference types="cypress" />

describe("Our first suite", () => {
  it.skip("some test name", () => {
    //the forward slash as a root path for our application
    cy.visit("/");

    //inorder to open the form
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //by tag name
    cy.get("input");

    //by id
    cy.get("#inputEmail");

    //by class name
    cy.get(".input-full-width");

    //by attribute name
    cy.get("[placeholder]");

    //by attribute name and value
    cy.get('[placeholder="Email"]');

    //by class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    //by tag name and attribute with value
    cy.get('input[placeholder="Email"]');

    //by two different attributes
    cy.get('[placeholder="Email"] [type="email"]');

    //by tagname, attribute with valie,ID and Class name
    cy.get('input[placeholder="Email"]#inputEmail.input-full-width');

    //by the most recommended way by cypress is to create your own attribute
    //create the attribute and add it to the source code
    cy.get('[data-cy="inputEmail"]');
  });

  it("run this test", () => {
    cy.visit("/");

    //inorder to open the form
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    cy.wait(1000);

    cy.get('[data-cy="signInButton"]');
    cy.contains("Sign in");
    cy.contains('[status="warning"]', "Sign in");

    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in") //assertion
      .parents("form")
      .find("nb-checkbox")
      .click({ force: true });

    cy.contains("nb-card", "Horizontal form").find('[type="email"]');
  });

  it("then and wrap methods", () => {
    cy.visit("/");

    //inorder to open the form
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // cy.contains('nb-card','Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
    // cy.contains('nb-card','Using the Grid').find('[for="inputPassword2"]').should('contain','Password')
    // cy.contains('nb-card','Basic form').find('[for="exampleInputEmail1"]').should('contain','Email address')
    // cy.contains('nb-card','Basic form').find('[for="exampleInputPassword1"]').should('contain','Password')

    //selenium
    //     const firstForm =   cy.contains('nb-card','Using the Grid')
    //     const secondForm= cy.contains('nb-card','Basic form')

    //   firstForm.find('[for="inputEmail1"]').should('contain','Email')
    //   firstForm.find('[for="inputPassword2"]').should('contain','Password')
    //   secondForm.find('[for="exampleInputEmail1"]').should('contain','Email address')

    //Cypress style
    cy.contains("nb-card", "Using the Grid").then((firstForm) => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
      const passwordLabelFirst = firstForm
        .find('[for="inputPassword2"]')
        .text();

      expect(emailLabelFirst).to.equal("Email");

      expect(passwordLabelFirst).to.equal("Password");

      cy.contains("nb-card", "Basic form").then((secondForm) => {
        const passwordSecondText = secondForm
          .find('[for="exampleInputPassword1"]')
          .text();

        expect(passwordLabelFirst).to.equal(passwordSecondText);

        cy.wrap(secondForm)
          .find('[for="exampleInputPassword1"]')
          .should("contain", "Password");
      });
    });
  });

  it("Invoke Command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // //1
    // cy.get('[for="exampleInputEmail1"]')
    //   .should("contain", "Email address")
    //   .should("have.class", "label")
    //   .and("have.text", "Email address");

    // //2
    // cy.get('[for="exampleInputEmail1"]').then((label) => {
    //   expect(label.text()).to.equal("Email address");
    //   expect(label).to.have.class("label");
    //   expect(label).to.have.text("Email address");
    // });

    //3
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });

    //ex of using invoke function is getting the attribute values and making some assertion with this values
    //or anything you need to do with this values
    cy.contains("nb-card", "Basic form")
      .find("nb-checkbox")
      .click({ force: true })
      .find(".custom-checkbox")
      .invoke("attr", "class")
      //.should('contain','checked')
      .then((classValue) => {
        //  expect(classValue).to.contain("checked");
        expect(classValue).to.contain("custom-checkbox");
      });
  });

  it("Assert Property", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click({ force: true });
        cy.get("nb-calendar-day-picker").contains("6").click({ force: true });
        cy.wrap(input)
          .invoke("prop", "value")
          .should("contain", "Sep 26, 2022");
      });
  });

  it("Dynamic date", () => {
    function selectDayFromCurrent(day) {
      let date = new Date();
      date.setDate(date.getDate() + day);
      let futureDay = date.getDate();
      console.log(futureDay);
      let futureMonth = date.toLocaleString("default", { month: "short" });
      let dateAssert =
        futureMonth + " " + futureDay + ", " + date.getFullYear();

      cy.get("nb-calendar-navigation")
        .invoke("attr", "ng-reflect-date")
        .then((dateAttribute) => {
          if (!dateAttribute.includes(futureMonth)) {
            cy.get('[data-name="chevron-right"]').click({ force: true });
            selectDayFromCurrent(day);
          } else {
            cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]')
              .contains(futureDay)
              .click({ force: true });
          }
        });
      return dateAssert;
    }

    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click({ force: true });
        let dateAssert = selectDayFromCurrent(1);
        cy.wrap(input).invoke("prop", "value").should("contain", dateAssert);
        cy.wrap(input).should("have.value", dateAssert); //another assertion
      });
  });

  it("radio button", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons)
          .first()
          .check({ force: true })
          .should("be.checked");

        cy.wrap(radioButtons).eq(1).check({ force: true });

        cy.wrap(radioButtons).first().should("not.be.checked");

        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });

  it("check boxes ", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    //cy.get('[type="checkbox"]').check({force: true})
    cy.get('[type="checkbox"]').eq(0).click({ force: true });
    cy.get('[type="checkbox"]').eq(1).click({ force: true });
  });

  it("Lists and dropdowns date", () => {
    cy.visit("/");

    //1
    // cy.get('nav nb-select').click()
    // cy.get('.options-list').contains('Dark').click()
    // cy.get('nav nb-select').should('contain','Dark')
    // cy.get('nb-layout-header nav').should('have.css','background-color','rgb(34, 43, 69)')

    //2
    cy.get("nav nb-select").then((dropdown) => {
      cy.wrap(dropdown).click();
      cy.get(".options-list nb-option").each((listItem, index) => {
        const itemText = listItem.text().trim();

        const colors = {
          Light: "rgb(255, 255, 255)",
          Dark: "rgb(34, 43, 69)",
          Cosmic: "rgb(50, 50, 89)",
          Corporate: "rgb(255, 255, 255)",
        };

        cy.wrap(listItem).click();
        cy.wrap(dropdown).should("contain", itemText);
        cy.get("nb-layout-header nav").should(
          "have.css",
          "background-color",
          colors[itemText]
        );
        if (index < 3) {
          cy.wrap(dropdown).click();
        }
      });
    });
  });

  it("Web tables", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();
    cy.wait(1000);

    //1 (modify the age based on the name)
    cy.get("tbody")
      .contains("tr", "Larry")
      .then((tableRow) => {
        cy.wrap(tableRow).find(".nb-edit").click({ force: true });
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("25");
        cy.wrap(tableRow).find(".nb-checkmark").click({ force: true });
        cy.wrap(tableRow).find("td").eq(6).should("contain", "25");
      });

    //2 (Add a new record to the table)
    cy.get("thead").find(".nb-plus").click({ force: true });
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((tableRow) => {
        cy.wrap(tableRow).find('[placeholder = "First Name"]').type("Artem");
        cy.wrap(tableRow).find('[placeholder = "Last Name"]').type("Bondar");
        cy.wrap(tableRow).find(".nb-checkmark").click({ force: true });
      });
    cy.get("tbody tr")
      .first()
      .find("td")
      .then((tableColumns) => {
        cy.wrap(tableColumns).eq(2).should("contain", "Artem");
        cy.wrap(tableColumns).eq(3).should("contain", "Bondar");
      });

    //3 (search)
    const age = [20, 30, 40, 200];

    cy.wrap(age).each((age) => {
      cy.get('thead [placeholder="Age"]').clear().type(age);
      cy.wait(500);
      cy.get("tbody tr").each((tableRow) => {
        if (age == 200) {
          cy.wrap(tableRow).should("contain", "No data found");
        } else {
          cy.wrap(tableRow).find("td").eq(6).should("contain", age);
        }
      });
    });
  });

  it("tooltip", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();

    cy.contains("nb-card", "Colored Tooltips")
      .contains("Default")
      .click({ force: true });

    cy.get("nb-tooltip").should("contain", "This is a tooltip");
  });

  it("dialog box (related to the window of the browser) and delete icon", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    //1
    // cy.get('tbody tr').first().find('.nb-trash').click()
    // cy.on('window:confirm', (confirm) => {
    //     expect(confirm).to.equal('Are you sure you want to delete?')
    // })

    //2
    // const stub = cy.stub()
    // cy.on('window:confirm', stub)
    // cy.get('tbody tr').first().find('.nb-trash').click().then( () => {
    //     expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
    // })

    //3 (delete the value from the table)
    cy.get("tbody tr").first().find(".nb-trash").click();
    cy.on("window:confirm", () => false);
  });
});
