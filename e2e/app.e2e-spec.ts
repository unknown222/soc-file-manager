import { SocFileManagerPage } from './app.po';

describe('soc-file-manager App', () => {
  let page: SocFileManagerPage;

  beforeEach(() => {
    page = new SocFileManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
