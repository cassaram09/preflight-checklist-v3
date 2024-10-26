import chalk from 'chalk';
import {CustomError} from './customError.helper';

chalk.level = 1;

// only for use server side in NodeJS
class Logger {
  debug(message: string): void {
    console.log(chalk.green(message));
  }

  info(message: string): void {
    console.log(chalk.white(message));
  }

  warning(message: string): void {
    console.log(chalk.yellow(message));
  }

  error(error: CustomError): void {
    console.log(
      `- ${chalk.red('error')}: ${chalk.red(error.name)} ${chalk.red(
        `(${error.category})`,
      )}`,
    );
    console.log(`  ${chalk.red(error.message)}`);
    console.log(`  ${chalk.red(JSON.stringify(error.data))}`);
    console.log(`  ${chalk.red(JSON.stringify(error.stack))}`);
  }
}

const logger = new Logger();

export default logger;
