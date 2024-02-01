import type { Address } from 'viem'
import { SUPPORTED_CHAINS, type SupportedChainId } from './chain-ids'
import axios from 'axios'

const getEndpointUrl = (chainId: SupportedChainId) =>
  `https://api-v2.pendle.finance/core/v1/${chainId}/assets/all`

export type Token = {
  baseType: string
  address: Address
}

const FALLBACK_ADDRESSES: Record<SupportedChainId, Address[]> = {
  [SUPPORTED_CHAINS.ARBITRUM]: [
    '0x0c880f6761f1af8d9aa9c466984b80dab9a8c9e8',
    '0x3209e9412cca80b18338f2a56ada59c484c39644',
    '0x4277f8f2c384827b5273592ff7cebd9f2c1ac258',
    '0x1addd80e6039594ee970e5872d247bf0414c8903',
    '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
    '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
    '0xf97f4df75117a78c1a5a0dbb814af92458539fb4',
    '0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0',
    '0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a',
    '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    '0x17fc002b466eec40dae837fc4be5c67993ddbd6f',
    '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
    '0x5402b5f40310bded796c7d0f3ff6683f5c0cffdf',
    '0x0000000000000000000000000000000000000000',
    '0xd85e038593d7a098614721eae955ec2022b9b91b',
    '0x3d9907f9a368ad0a51be60f7da3b97cf940982d8',
    '0xb6cfcf89a7b22988bfc96632ac2a9d6dab60d641',
    '0x6694340fc020c5e6b96567843da2df01b2ce1eb6',
    '0x912ce59144191c1204e64559fe8253a0e49e6548',
    '0xbfca4230115de8341f3a3d5e8845ffb3337b2be3',
    '0xa6c5c7d189fa4eb5af8ba34e63dcdd3a635d433f',
    '0xc9da32c3b444f15412f7feac6104d1e258d23b1b',
    '0x5979d7b546e38e414f7e9822514be443a4800529',
    '0xec70dcb4a1efa46b8f2d97c310c9c4790ba5ffa8',
    '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
    '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
    '0x4307fbdcd9ec7aea5a1c2958decaa6f316952bab',
    '0x3ae5285e7fc52d7a09457784eece8ecb40d461b7',
    '0x23ee2343b892b1bb63503a4fabc840e0e2c6810f',
    '0xeb466342c4d449bc9f53a865d5cb90586f405215',
    '0xe4dddfe67e7164b0fe14e218d80dc4c08edc01cb',
    '0xb688ba096b7bb75d7841e47163cd12d18b36a5bf',
    '0x2b5fa2c7cb4b0f51ea7250f66ca3ed369253addf',
    '0x2ac2b254bc18cd4999f64773a966e4f4869c34ee',
    '0x9cfb13e6c11054ac9fcb92ba89644f30775436e4',
    '0x83fe9065ed68506a0d2ece59cd71c43bbff6e450',
    '0x7cbaf5a14d953ff896e5b3312031515c858737c8',
    '0x0a9bbf8299fed2441009a7bb44874ee453de8e5d',
    '0xc25cef6061cf5de5eb761b50e4743c1f5d7e5407',
    '0x55ade3b74abef55bf379ff6ae61cb77a405eb4a8',
    '0xc46c5de6eca1ca6dc3f8c5d3ce863ae326f4b2cf',
    '0x724dc807b04555b71ed48a6896b6f41593b8c637',
  ],
  [SUPPORTED_CHAINS.ETHEREUM]: [
    '0x808507121b80c02388fad14726482e061b8da827',
    '0x4f30a9d41b80ecc5b94306ab4364951ae3170210',
    '0x853d955acef822db058eb8505911ed77f175b99e',
    '0x3175df0976dfa876431c2e9ee6bc45b65d3473cc',
    '0xd533a949740bb3306d119cc777fa900ba034cd52',
    '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b',
    '0xf4d2888d29d722226fafa5d9b24f9164c092421e',
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
    '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0',
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    '0x0000000000000000000000000000000000000000',
    '0xdac17f958d2ee523a2206206994597c13d831ec7',
    '0x4d224452801aced8b2f0aebe155379bb5d594381',
    '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    '0x4fabb145d64652a948d72533023f6e7a623c7c53',
    '0x6b175474e89094c44da98b954eedeac495271d0f',
    '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
    '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    '0x514910771af9ca656af840dff83e8264ecf986ca',
    '0x8e870d67f660d95d5be530380d0ec0bd388289e1',
    '0x0000000000085d4780b73119b644ae5ecd22b376',
    '0x1e19cf2d73a72ef1332c882f20534b6519be0276',
    '0xba100000625a3754423978a60c9317c58a424e3d',
    '0xc0c293ce456ff0ed870add98a0828dd4d2903dbf',
    '0xae78736cd615f374d3085123a210448e74fc6393',
    '0x32296969ef14eb0c6d29669c550d4a0449130230',
    '0x8a34b5ad76f528bfec06c80d85ef3b53da7fc300',
    '0xe95a203b1a91a908f9b9ce46459d101078c2c3cb',
    '0x38ea452219524bb87e18de1c24d3bb59510bd783',
    '0xaf5191b0de278c7286d6c7cc6ab6bb8a73ba2cd6',
    '0x5e8422345238f34275888049021821e8e08caa1f',
    '0xac3e018457b222d93114458476f3e3416abbe38f',
    '0xb08885e6026bab4333a80024ec25a1a3e1ff2b8a',
    '0x9559aaa82d9649c7a7b220e7c461d2e74c9a3593',
    '0x02d928e68d8f10c0358566152677db51e1e2dc8c',
    '0x59463bb67ddd04fe58ed291ba36c26d99a39fbc6',
    '0x60d604890feaa0b5460b28a424407c24fe89374a',
    '0xf951e335afb289353dc249e82926178eac7ded78',
    '0x793f2d5cd52dfafe7a1a1b0b3988940ba2d6a63d',
    '0x4bc3263eb5bb2ef7ad9ab6fb68be80e43b43801f',
    '0xdfe6e7e18f6cc65fa13c8d8966013d4fda74b6ba',
    '0x4cbde5c4b4b53ebe4af4adb85404725985406163',
    '0x03928473f25bb2da6bc880b07ecbadc636822264',
    '0xbb6881874825e60e1160416d6c426eae65f2459e',
    '0xa35b1b31ce002fbf2058d22f30f95d405200a15b',
    '0xae8535c23afedda9304b03c68a3563b75fc8f92b',
    '0xb54e6aadbf1ac1a3ef2a56e358706f0f8e320a03',
    '0x83f20f44975d03b1b09e64809b757c47f942beea',
    '0x465a5a630482f3abd6d3b84b39b29b07214d19e5',
    '0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3',
    '0xdcee70654261af21c44c093c300ed3bb97b78192',
    '0xdf3ac4f479375802a821f7b7b46cd7eb5e4262cc',
    '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490',
    '0xf939e0a03fb07f59a73314e73794be0e57ac1b4e',
    '0xb27d1729489d04473631f0afaca3c3a7389ac9f8',
    '0xa663b02cf0a4b149d2ad41910cb81e23e1c41c32',
    '0x22fc5a29bd3d6cce19a06f844019fd506fce4455',
    '0xfe80d611c6403f70e5b1b9b722d2b3510b740b2b',
    '0xd6ecfd0d5f1dfd3ad30f267a3a29b3e1bc4fd54f',
    '0x35fa164735182de50811e8e2e824cfb9b6118ac2',
    '0xcd5fe23c85820f7b72d0926fc9b05b43e359b7ee',
  ],
  [SUPPORTED_CHAINS.OPTIMISM]: [
    '0xbc7b1ff1c6989f006a1185318ed4e7b5796e66e1',
    '0xd5c47d2383fddc19596489280c0a33ac42b2bb18',
    '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
    '0x1f32b1c2345538c0c6f582fcb022739c4a194ebb',
    '0x0000000000000000000000000000000000000000',
    '0x9bcef72be871e61ed4fbbc7630889bee758eb81d',
    '0x4200000000000000000000000000000000000006',
    '0x7f5c764cbc14f9669b88837ca1490cca17c31607',
    '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
    '0x4200000000000000000000000000000000000042',
    '0x8700daec35af8ff88c16bdf0418774cb3d7599b4',
    '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
  ],
  [SUPPORTED_CHAINS.BSC]: [
    '0xb3ed0a426155b79b898849803e3b36552f7ed507',
    '0x8a09574b0401a856d89d1b583ee22e8cb0c5530b',
    '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    '0xa2e3356610840701bdf5611a53974510ae27e2e1',
    '0x8a420aaca0c92e3f97cdcfdd852e01ac5b609452',
    '0x64048a7eecf3a2f1ba9e144aac3d7db6e58f555e',
    '0xf4c8e32eadec4bfe97e0f595add0f4450a863a11',
    '0x0000000000000000000000000000000000000000',
    '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    '0x90c97f71e18723b0cf0dfa30ee176ab653e89f40',
    '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    '0x52f24a5e03aee338da5fd9df68d2b6fae1178827',
  ],
}

export const getDefaultTokenAddresses = (chainId: SupportedChainId) => {
  return FALLBACK_ADDRESSES[chainId]
}

export async function getTokenAddresses(
  chainId: SupportedChainId,
): Promise<Address[]> {
  return axios
    .get<Token[]>(getEndpointUrl(chainId))
    .then((response) =>
      response.data
        .filter(
          (token) => !['SY', 'PENDLE_LP', 'PT', 'YT'].includes(token.baseType),
        )
        .map((token) => token.address),
    )
    .catch(() => getDefaultTokenAddresses(chainId))
}
