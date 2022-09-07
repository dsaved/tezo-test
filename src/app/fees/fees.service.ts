import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FeesService {
  async getLatestBlock() {
    return new Promise((resolve, reject) => {
      axios
        .get('https://tez.nodes.ejaraapis.xyz/chains/main/blocks/')
        .then((response) => resolve(response.data[0][0]))
        .catch((err) => reject(err));
    });
  }

  async getTransactionFeesByHash(hash: string) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://tez.nodes.ejaraapis.xyz/chains/main/blocks/${hash}`)
        .then((response) => {
          if (!response.data.operations) {
            return reject(response.data);
          }
          
          //  get all transactions from the blockchain
          const fees = [];
          const operationList = response.data.operations;
          for (const operations of operationList) {
            for (const operation of operations) {
              const contents = operation.contents;
              for (const content of contents) {
                if (content.kind === 'transaction') {
                  fees.push(content.fee);
                }
              }
            }
          }

          //  resolve array of transaction fees
          resolve(fees);
        })
        .catch((err) => reject(err));
    });
  }
}
