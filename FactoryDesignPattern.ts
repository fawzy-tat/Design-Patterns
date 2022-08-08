/**
 * This code is based on a conceptual example from REFACTURING GURU.
 * https://refactoring.guru/
 * @fawzytat https://github.com/fawzy-tat
 * To run the file make sure you have typescript ts-node installed globally.
 * npm i -g typescript ts-node
 * use ts-node FactoryDesignPattern.ts to run the file
 */
/**
 * The Creator class ( Super Class ) declares the factory method that is supposed to return an
 * object of a Product class. The Creator's subclasses usually provide the
 * implementation of this method.
 */
abstract class Mailer {
  /**
   * Note that the Creator may also provide some default implementation of the
   * factory method.
   */
  public abstract generateMailTemplate(): MailTemplate;

  /**
   * Also note that, despite its name, the Creator's primary responsibility is
   * not creating products. Usually, it contains some core business logic that
   * relies on Product objects, returned by the factory method. Subclasses can
   * indirectly change that business logic by overriding the factory method
   * and returning a different type of product from it.
   */
  public sendMail(): string {
    // Call the factory method to create a Product object.
    const mailTemplate = this.generateMailTemplate();
    // Now, use the product.
    return `Sending the following mail : ${mailTemplate.generate()}`;
  }
}

/**
 * Concrete Creators override the factory method in order to change the
 * resulting product's type.
 */
class WelcomeMailGenerator extends Mailer {
  /**
   * Note that the signature of the method still uses the abstract product
   * type, even though the concrete product is actually returned from the
   * method. This way the Creator can stay independent of concrete product
   * classes.
   */
  public generateMailTemplate(): MailTemplate {
    return new WelcomeMailTemplate();
  }
}

class NewsLetterMailGenerator extends Mailer {
  public generateMailTemplate(): MailTemplate {
    return new NewsLetterMailTemplate();
  }
}

/**
 * The Product interface declares the operations that all concrete products must
 * implement.
 */
interface MailTemplate {
  generate(): string;
}

/**
 * Concrete Products provide various implementations of the Product interface.
 */
class WelcomeMailTemplate implements MailTemplate {
  public generate(): string {
    return "Welcome aboard! Thanks for signing up!";
  }
}

class NewsLetterMailTemplate implements MailTemplate {
  public generate(): string {
    return "Please enjoy our newsletter!";
  }
}

/**
 * The client code works with an instance of a concrete creator, albeit through
 * its base interface. As long as the client keeps working with the creator via
 * the base interface, you can pass it any creator's subclass.
 */
function clientCode(mailer: Mailer) {
  // ...
  // or maybe just use some if statments here
  console.log(mailer.sendMail());
  // ...
}

/**
 * The Application picks a creator's type depending on the configuration or
 * environment.
 */
clientCode(new WelcomeMailGenerator());
console.log("---");
clientCode(new NewsLetterMailGenerator());
