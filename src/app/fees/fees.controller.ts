import { Controller, Get, Logger, Param } from '@nestjs/common';
import { FeesService } from './fees.service';

@Controller()
export class FeesController {
  private readonly logger = new Logger(FeesController.name);
  constructor(private readonly feesService: FeesService) {}

  @Get('/fees/latest')
  async getFeeByLatestBlock() {
    const result = {
      block: 'No block hash found',
      min: 0,
      max: 0,
      average: 0,
      median: 0,
    };

    const block = await this.feesService
      .getLatestBlock()
      .catch((error) => this.logger.error(error));

    if (block) {
      result.block = block as string;

      // get the transactions fees of the block
      // the returned value is an array of string
      const _fees = (await this.feesService
        .getTransactionFeesByHash(result.block)
        .catch((error) => this.logger.error(error))) as string[];

      //convert the array of strings to array of numbers
      const fees = _fees.map((fee) => Number(fee));
      console.log(fees);

      const [average, median, min, max] = this.computeResult(fees);
      result.average = average;
      result.median = median;
      result.min = min;
      result.max = max;
    }

    return result;
  }

  @Get('/fees/:block_number')
  async getFeesByBlock(@Param('block_number') block_number: string) {
    const result = {
      min: 0,
      max: 0,
      average: 0,
      median: 0,
    };

    // get the transactions fees of the block
    // the returned value is an array of string
    const _fees = (await this.feesService
      .getTransactionFeesByHash(block_number)
      .catch((error) => this.logger.error(error))) as string[];

    //convert the array of strings to array of numbers
    const fees = _fees.map((fee) => Number(fee));
    console.log(fees);

    const [average, median, min, max] = this.computeResult(fees);
    result.average = average;
    result.median = median;
    result.min = min;
    result.max = max;

    return result;
  }

  private computeResult(fees: number[]) {
    // comput average result
    const average = fees.reduce((a, b) => a + b, 0) / fees.length;

    // comput median result
    const median = this.median(fees);

    // comput max result
    const max = Math.max(...fees);

    // comput min result
    const min = Math.min(...fees);

    return [average, median, min, max];
  }


  // get median of array of numbers
  private median(fees: number[]) {
    fees.sort(function (a, b) {
      return a - b;
    });
    var half = Math.floor(fees.length / 2);

    if (fees.length % 2) return fees[half];
    else return (fees[half - 1] + fees[half]) / 2.0;
  }
}
