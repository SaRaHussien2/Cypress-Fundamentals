/// <reference types = "cypress" />

describe("JSON Objects", () => {
  it("JSON Objects", () => {
    cy.openHomePage();
    const simpleObject = { key1: "value1", key2: "value2" };

    const simpleArrayOfValues = ["one", "two", "three"];

    const arrayOfObjects = [
      { key1: "value1" },
      { key2: "value2" },
      { key3: "value3" },
    ];

    const typeOfData = { string: "this is a string", number: 10 };

    //Create an Object
    const mix = {
      FirstName: "Sara",
      LastName: "Hussien",
      Age: 123,
      Students: [
        {
          FirstName: "first",
          LasrName: "last",
        },
        {
          FirstName: "child",
          LasrName: "parent",
        },
      ],
    };
    console.log(simpleObject.key2);
    console.log(simpleObject["key2"]);
    console.log(simpleArrayOfValues[1]);
    console.log(arrayOfObjects[2].key3);
    console.log(mix.Students[1].LasrName);

    const lastNameOfSecondStudent = mix.Students[1].LastName;
    console.log(lastNameOfSecondStudent);
  });
});
