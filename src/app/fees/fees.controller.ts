import { Controller, Get, Logger, Param } from '@nestjs/common';
import { computeResult } from 'src/helpers/functions.helper';
import { FeesService } from './fees.service';

@Controller()
export class FeesController {
  private readonly logger = new Logger(FeesController.name);
  constructor(private readonly feesService: FeesService) {}

  @Get('/fees/latest')
  async getFeeByLatestBlock() {
    let result = {
      block: 'No block hash found',
      min: 0,
      max: 0,
      average: 0,
      median: 0,
    };

    const block: string = await this.feesService
      .getLatestBlock()
      .catch((error) => this.logger.error(error)) as string;
    
    console.log(block);

    if (block) {
      // get the transactions fees of the block
      // the returned value is an array of string
      const _fees = (await this.feesService
        .getTransactionFeesByHash(block)
        .catch((error) => this.logger.error(error))) as string[];

      //convert the array of strings to array of numbers
      const fees = _fees.map((fee) => Number(fee));

      result = computeResult(fees) as any;
      result.block = block as string;
    }

    return result;
  }

  @Get('/fees/:block_number')
  async getFeesByBlock(@Param('block_number') block_number: string) {
    // get the transactions fees of the block
    // the returned value is an array of string
    const _fees = (await this.feesService
      .getTransactionFeesByHash(block_number)
      .catch((error) => this.logger.error(error))) as string[];

    //convert the array of strings to array of numbers
    const fees = _fees.map((fee) => Number(fee));
    return computeResult(fees);
  }
}
