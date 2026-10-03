const {test,expect} = require('@playwright/test');
test.beforeEach(async ({page}) => {
 await page.route('**/*', route => ['http://127.0.0.1:4173','http://127.0.0.1:4174'].includes(new URL(route.request().url()).origin) ? route.continue() : route.abort());
});
test('synthetic date changes, current/future boundaries and empty input update immediately', async ({page}) => {
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto('http://127.0.0.1:4174');
 await expect(page.locator('.EventCard')).toHaveCount(1);
 await page.locator('#date').fill('2026-10-03T11:59');
 await page.getByRole('button',{name:'Текущие события',exact:true}).click();
 await expect(page.locator('.EventCard')).toHaveCount(0);
 await page.locator('#date').fill('2026-10-03T12:00');
 await expect(page.locator('.EventCard')).toHaveCount(1);
 await page.locator('#date').fill('2026-10-03T14:00');
 await expect(page.locator('.EventCard')).toHaveCount(1);
 await page.locator('#date').fill('2026-10-03T14:01');
 await expect(page.locator('.EventCard')).toHaveCount(0);
 await page.getByRole('button',{name:'Будущие события',exact:true}).click();
 await page.locator('#date').fill('2026-10-03T11:59');
 await expect(page.locator('.EventCard')).toHaveCount(1);
 await page.locator('#date').fill('');
 await expect(page.locator('.EventCard')).toHaveCount(0);
 await page.getByRole('button',{name:'Все события',exact:true}).click();
 await expect(page.locator('.EventCard')).toHaveCount(1);
 await expect(page.getByRole('status')).toContainText('Карта недоступна');
 await page.screenshot({path:test.info().outputPath('synthetic-events.png'),fullPage:true});
 expect(errors).toEqual([]);
});
test('production Gatsby page hydrates without configuring a map provider', async ({page}) => {
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto('http://127.0.0.1:4173');
 await expect(page).toHaveTitle('События на день города Рыбинска 2022');
 await expect(page.getByRole('status')).toContainText('Карта недоступна');
 await page.locator('#date').fill('2026-10-03T00:00');
 await page.getByRole('button',{name:'Текущие события',exact:true}).click();
 await expect(page.locator('.EventCard')).toHaveCount(0);
 await page.screenshot({path:test.info().outputPath('historical-page.png'),fullPage:true});
 expect(errors).toEqual([]);
});
