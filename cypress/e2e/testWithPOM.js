/// <reference types="cypress" />

import { navigateTo } from "../support/page_objects/navigationPage";
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage";
import { onDatepickerPage } from "../support/page_objects/datepickerPage";
import { onSmartTablePage } from "../support/page_objects/smartTablePage";

describe("test with POM", () => {
  beforeEach("Open application", () => {
    cy.openHomePage();
  });

  it("verify navigations across the pages", () => {
    navigateTo.formLayoutsPage();
    navigateTo.datepickerPage();
    navigateTo.smartTablePage();
    navigateTo.tooltipPage();
    navigateTo.toasterPage();
  });

  it.only("should submit Inline and Basic form and select tomorrow date in the calendar", () => {
    navigateTo.formLayoutsPage();
    onFormLayoutsPage.submitInlineFormWithNameAndEmail("Sara", "test@test.com");
    onFormLayoutsPage.submitBasicFormWithEmailAndPassword("test@test.com","123456");

    navigateTo.datepickerPage();
    onDatepickerPage.selectCommonDatepickerDateFromToday(1);
    onDatepickerPage.selectDatepickerWithRangeFromToday(7, 14);
    
    navigateTo.smartTablePage();
    onSmartTablePage.addNewRecordWithFirstNameAndLastName("Sara", "Hussien");
    onSmartTablePage.updateAgeByFirstName("Sara", "123");
    onSmartTablePage.deleteRowByIndex(1);
  });
});
