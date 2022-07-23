/**
 * This code is based on a conceptual example from REFACTURING GURU.
 * https://refactoring.guru/
 * @fawzytat https://github.com/fawzy-tat
 * To run the file make sure you have typescript ts-node installed globally.
 * npm i -g typescript ts-node
 * use ts-node StrategyDP.ts to run the file
 */
class Sale {
  /**
   * @type {DiscountStrategy}
   */
  private discountStrategy: DiscountStrategy;

  /**
   * Usually, the Context accepts a strategy through the constructor, but also
   * provides a setter to change it at runtime.
   */
  constructor(discountStrategy: DiscountStrategy) {
    this.discountStrategy = discountStrategy;
  }

  /**
   *
   */
  public setStrategy(discountStrategy: DiscountStrategy) {
    this.discountStrategy = discountStrategy;
  }
  /**
   * External function to be consumed by the client
   * The Context delegates some work to the Strategy object instead of
   * implementing multiple versions of the algorithm on its own.
   */
  public getTotalDiscount(items: { item: string; price: number }[]): void {
    // some logic

    const total = this.discountStrategy.calculateTotalDiscount(items);
    console.log(total);

    // some other logic
  }
}

/**
 * The Strategy interface declares operations common to all supported versions
 * of some algorithm.
 * The Context uses this interface to call the algorithm defined by Concrete
 * Strategies.
 */
interface DiscountStrategy {
  calculateTotalDiscount(items: { item: string; price: number }[]): number;
}

/**
 * Concrete Strategies implement the algorithm while following the base Strategy
 * interface. The interface makes them interchangeable in the Context.
 */

/**
 * First strategy applies a 50 percent discount on all items
 *@param items // Array of the checkout cart items
 *@returns A number // total discount
 */
class FiftyPercentDiscountStrategy implements DiscountStrategy {
  public calculateTotalDiscount(
    items: { item: string; price: number }[]
  ): number {
    // Sum of all items price then divide by 2
    return (
      items.reduce((acc, object) => {
        return acc + object.price;
      }, 0) / 2
    );
  }
}

/**
 * Second strategy applies a 50 percent discount only on the first item
 * some ridiculous sales strategy for demonstration purposes!
 *@param items // Array of the checkout cart items
 *@returns A number // total discount
 */
class FirstItemDiscountStrategy implements DiscountStrategy {
  public calculateTotalDiscount(
    items: { item: string; price: number }[]
  ): number {
    // Sum of all items price minus 50% of the first item.
    return (
      items.reduce((acc, object) => {
        return acc + object.price;
      }, 0) -
      items[0].price / 2
    );
  }
}

const cartItems = [
  { item: "Headphone", price: 20 },
  { item: "Monitor", price: 70 },
];

/**
 * Summer Sale is a client of the Sales context
 */
const SummerSale = new Sale(new FiftyPercentDiscountStrategy());
SummerSale.getTotalDiscount(cartItems);

console.log("--------");

/**
 * Switch strategy of the summer sale to FirstItemDiscountStrategy
 */
SummerSale.setStrategy(new FirstItemDiscountStrategy());
SummerSale.getTotalDiscount(cartItems);

console.log("--------");

/**
 * Black Friday Sale is another client of the Sales context
 */
const BlackFridaySale = new Sale(new FiftyPercentDiscountStrategy());
SummerSale.getTotalDiscount(cartItems);
