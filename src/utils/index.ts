import { BigNumber, ethers, utils } from 'ethers';
import type { IBid, ICombinedBid, IConsultation } from 'utils/types';
import web3 from 'web3';
import {
  DEFAULT_NETWORK,
  QUEUE_CONTRACT_ADDRESS,
  RPC_URLS,
} from 'web3/constants';

const provider = ethers.getDefaultProvider(RPC_URLS[DEFAULT_NETWORK]);

/**
 * Shorten an Ethereum address. `charsLength` allows to change the number of
 * characters on both sides of the ellipsis.
 *
 * Examples:
 *   shortenAddress('0x19731977931271')    // 0x1973…1271
 *   shortenAddress('0x19731977931271', 2) // 0x19…71
 *   shortenAddress('0x197319')            // 0x197319 (already short enough)
 *
 * @param {string} address The address to shorten
 * @param {number} [charsLength=4] The number of characters to change on both sides of the ellipsis
 * @returns {string} The shortened address
 */
export function shortenAddress(address: string, charsLength = 4): string {
  const prefixLength = 2; // "0x"
  if (!address) {
    return '';
  }
  if (address.length < charsLength * 2 + prefixLength) {
    return address;
  }
  return (
    address.slice(0, charsLength + prefixLength) +
    '…' +
    address.slice(-charsLength)
  );
}

export const combineBids = async (
  chainId: number,
  consultations: IConsultation[],
  bids: IBid[],
): Promise<ICombinedBid[] | null> => {
  if (!consultations) return null;
  const combinedBids = await Promise.all(
    consultations.map(async consultation => {
      try {
        const combinedBid = await addFromAddress(chainId, consultation, bids);
        return combinedBid;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return false;
      }
    }),
  );
  return combinedBids.filter(bid => bid) as ICombinedBid[];
};

export function round(value: BigNumber | string, decimals: number): string {
  if (typeof value === 'string') {
    const valueNumber = Number(value);
    return valueNumber.toFixed(decimals);
  }
  const valueNumber = value.toNumber();
  return valueNumber.toFixed(decimals);
}

const addFromAddress = async (
  chainId: number,
  consultation: IConsultation,
  bids: IBid[],
) => {
  if (!utils.isHexString(consultation.submission_hash)) return false;
  const newBid: ICombinedBid = {
    project_name: consultation.project_name,
    created: consultation.createdAt,
    airtable_id: consultation._id,
    submission_hash: consultation.submission_hash,
    bid_id: '',
    amount: '0',
    submitter: '',
    bidCreated: '0',
    createTxHash: '',
    changes: [],
    from: 'NA',
    status: '',
  };
  const combinedBid = await getData(chainId, newBid, consultation, bids);
  return combinedBid;
};

const getData = async (
  chainId: number,
  combinedBid: ICombinedBid,
  consultation: IConsultation,
  bids: IBid[],
) => {
  const tx = await provider.getTransaction(consultation.submission_hash);
  combinedBid['from'] = tx.from.toLowerCase();

  const openBids = bids.filter(
    bid => bid.status !== 'canceled' && bid.status !== 'accepted',
  );
  openBids.forEach(bid => {
    let details = bid.details;
    if (utils.isBytes(bid.details)) {
      details = utils.parseBytes32String(bid.details);
      details = details.replace(/\0.*$/g, '');
    }
    const changes = [...bid.withdraws, ...bid.increases];
    const updatedChanges = changes.map(change => {
      if (change.withdrawnAt) {
        const updatedChange = change;
        updatedChange.changedAt = change.withdrawnAt;
        updatedChange.txHash = change.withdrawTxHash;
        return updatedChange;
      } else {
        const updatedChange = change;
        updatedChange.changedAt = change.increasedAt;
        updatedChange.txHash = change.increaseTxHash;
        return updatedChange;
      }
    });

    updatedChanges.sort(function (a, b) {
      return (
        new Date(Number(b.changedAt)).getTime() -
        new Date(Number(a.changedAt)).getTime()
      );
    });
    if (consultation.submission_hash === details) {
      combinedBid.bid_id = web3.utils
        .hexToNumber(
          bid.id.replace(
            `${QUEUE_CONTRACT_ADDRESS[chainId].toLowerCase()}-`,
            '',
          ),
        )
        .toString();
      combinedBid.amount = bid.amount;
      combinedBid.submitter = utils.getAddress(bid.submitter.id).toLowerCase();
      combinedBid.bidCreated = bid.createdAt;
      combinedBid.createTxHash = bid.createTxHash;
      combinedBid.changes = [...combinedBid.changes, ...updatedChanges];
      combinedBid.status = bid.status;
    }
  });
  return combinedBid;
};