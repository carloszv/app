import { browser } from 'protractor';
import { Helpers } from './helpers/helpers';
import { LoginPageObject } from './page-objects/login-page-object';
import { SettingsPageObject } from './page-objects/settings-page-object';

describe('Logout E2E Test', () => {

  let originalTimeout;
  const loginPage: LoginPageObject = new LoginPageObject();
  const settingsPage: SettingsPageObject = new SettingsPageObject();

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = Helpers.JASMINE_TIMEOUT_INTERVAL;
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeEach(() => {
    loginPage.loadPage();
  });

  afterEach(() => {
    browser.manage().deleteAllCookies();
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
    browser.executeScript('window.indexedDB.deleteDatabase("imsClientDB")');
  });

  it('Should return to Loginscreen', () => {
    settingsPage.loadPage();
    settingsPage.logout();
    loginPage.getServerInputText().then(text => expect(text).toEqual(loginPage.server));
    loginPage.getUserInputText().then(text => expect(text).toEqual(loginPage.user));
    loginPage.getPasswordInputText().then(text => expect(text).toEqual(''));
  });
});
