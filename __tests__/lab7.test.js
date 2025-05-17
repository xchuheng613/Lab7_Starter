describe('Basic user flow for Website', () => {
  // First, visit the lab 7 website
  beforeAll(async () => {
    await page.goto('https://cse110-sp25.github.io/CSE110-Shop/');
  });

  // Each it() call is a separate test
  // Here, we check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');

    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });

    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  // We use .skip() here because this test has a TODO that has not been completed yet.
  // Make sure to remove the .skip after you finish the TODO. 
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');

    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;

    // Query select all of the <product-item> elements
    const prodItemsData = await page.$$eval('product-item', prodItems => {
      return prodItems.map(item => {
        // Grab all of the json data stored inside
        return data = item.data;
      });
    });

    console.log(`Checking product item 1/${prodItemsData.length}`);

    // Make sure the title, price, and image are populated in the JSON

    for (let i = 0; i < prodItemsData.length; i++) {
      console.log(`Checking product item ${i + 1}/${prodItemsData.length}`);
      const value = prodItemsData[i];
      if (value.title.length == 0) { allArePopulated = false; }
      if (value.price.length == 0) { allArePopulated = false; }
      if (value.image.length == 0) { allArePopulated = false; }
    }

    // Expect allArePopulated to still be true
    expect(allArePopulated).toBe(true);

    /**
    **** TODO - STEP 1 ****
    * Right now this function is only checking the first <product-item> it found, make it so that
      it checks every <product-item> it found
    * Remove the .skip from this it once you are finished writing this test.
    */

  }, 10000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');

    const product = await page.$('product-item');
    const button = await page.evaluateHandle((product) => {
      return product.shadowRoot.querySelector('button');
    }, product);

    const initialText = await button.getProperty('innerText');
    const initialTextValue = await initialText.jsonValue();
    
    await button.click();

    const newText = await button.getProperty('innerText');
    const newTextValue = await newText.jsonValue();

    expect(initialTextValue).toBe('Add to Cart');
    expect(newTextValue).toBe('Remove from Cart');

  }, 2500);

  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');

    await page.evaluate(() => localStorage.clear());
    await page.reload();

    const products = await page.$$('product-item');
    
    for (const product of products) {
      const button = await page.evaluateHandle((product) => {
        return product.shadowRoot.querySelector('button');
      }, product);
      
      const initialText = await button.getProperty('innerText');
      const initialTextValue = await initialText.jsonValue();
      
      if (initialTextValue === 'Add to Cart') {
        await button.click();
        await page.waitForFunction(
          (button) => button.innerText === 'Remove from Cart',
          { timeout: 1000 },
          button
        );
      }
    }

    const cartCount = await page.$('#cart-count');
    const cartCountText = await cartCount.getProperty('innerText');
    const cartCountValue = await cartCountText.jsonValue();

    expect(cartCountValue).toBe('20');
  }, 10000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');

    /**
     **** TODO - STEP 4 **** 
     * Reload the page, then select all of the <product-item> elements, and check every
       element to make sure that all of their buttons say "Remove from Cart".
     * Also check to make sure that #cart-count is still 20
     * Remember to remove the .skip from this it once you are finished writing this test.
     */

    await page.reload();

  
    const buttonsCorrect = await page.$$eval('product-item', items =>
      items.every(item => {
        const btn = item.shadowRoot.querySelector('button');
        return btn && btn.innerText === 'Remove from Cart';
      })
    );
    expect(buttonsCorrect).toBe(true);       

    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('20');

  }, 10000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {

    /**
     **** TODO - STEP 5 **** 
     * At this point the item 'cart' in localStorage should be 
       '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]', check to make sure it is
     * Remember to remove the .skip from this it once you are finished writing this test.
     */

       const cart = await page.evaluate(() => localStorage.getItem('cart'));
       expect(cart).toBe('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]');

  });

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');

    /**
     **** TODO - STEP 6 **** 
     * Go through and click "Remove from Cart" on every single <product-item>, just like above.
     * Once you have, check to make sure that #cart-count is now 0
     * Remember to remove the .skip from this it once you are finished writing this test.
     */
    const products = await page.$$('product-item');
    
    for (const item of products) {
      const button = await (await page.evaluateHandle(
        el => el.shadowRoot.querySelector('button'), item)).asElement();
      const text = await page.evaluate(el => el.innerText, button);
      if (text === 'Remove from Cart') await button.click();
    }

    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('0');

  }, 10000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');

    /**
     **** TODO - STEP 7 **** 
     * Reload the page once more, then go through each <product-item> to make sure that it has remembered nothing
       is in the cart - do this by checking the text on the buttons so that they should say "Add to Cart".
     * Also check to make sure that #cart-count is still 0
     * Remember to remove the .skip from this it once you are finished writing this test.
     */
    await page.reload();

    const allAdd = await page.$$eval('product-item', items =>
      items.every(item =>
        item.shadowRoot.querySelector('button').innerText === 'Add to Cart')
    );
    expect(allAdd).toBe(true);

    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('0');


  }, 10000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');

    /**
     **** TODO - STEP 8 **** 
     * At this point he item 'cart' in localStorage should be '[]', check to make sure it is
     * Remember to remove the .skip from this it once you are finished writing this test.
     */

    const cart = await page.evaluate(() => localStorage.getItem('cart'));
    expect(cart).toBe('[]');

  });
});
