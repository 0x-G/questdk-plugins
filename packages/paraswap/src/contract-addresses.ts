import type { Address } from 'viem'
import { ARB_ONE_CHAIN_ID, ETH_CHAIN_ID, OPTIMISM_CHAIN_ID } from './chain-ids'

export const OPTIMISM_SEPSP1_ADDRESS =
  '0x8c934b7dbc782568d14ceabbeaedf37cb6348615'

export const OPTIMISM_SEPSP2_ADDRESS =
  '0x26ee65874f5dbefa629eb103e7bbb2deaf4fb2c8'

export const MAINNET_SEPSP1_ADDRESS =
  '0x716fbc68e0c761684d9280484243ff094cc5ffab'

export const MAINNET_SEPSP2_ADDRESS =
  '0x593f39a4ba26a9c8ed2128ac95d109e8e403c485'

export const ETH_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000'

export const DEFAULT_SWAP_TOKEN_LIST: {
  [chainId: number]: readonly Address[]
} = {
  [ETH_CHAIN_ID]: [
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    '0xdac17f958d2ee523a2206206994597c13d831ec7',
    '0x72e2f4830b9e45d52f80ac08cb2bec0fef72ed9c',
  ],
  [ARB_ONE_CHAIN_ID]: [
    '0x17fc002b466eec40dae837fc4be5c67993ddbd6f',
    '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
    '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
    '0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a',
    '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
    '0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0',
    '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
    '0xf97f4df75117a78c1a5a0dbb814af92458539fb4',
  ],
  [OPTIMISM_CHAIN_ID]: [
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    '0x4200000000000000000000000000000000000006',
    '0x4200000000000000000000000000000000000042',
    '0x76fb31fb4af56892a25e32cfc43de717950c9278',
    '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
    '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
    '0x350a791bfc2c21f9ed5d10980dad2e2638ffa7f6',
    '0x8c6f28f2f1a3c87f0f938b96d27520d9751ec8d9',
    '0x7f5c764cbc14f9669b88837ca1490cca17c31607',
    '0x68f180fcce6836688e9084f035309e29bf0a2095',
    '0xf329e36c7bf6e5e86ce2150875a84ce77f477375',
    '0x82e64f49ed5ec1bc6e43dad4fc8af9bb3a2312ee',
    '0x6ab707aca953edaefbc4fd23ba73294241490620',
    '0x191c10aa4af7c30e871e70c95db0e4eb77237530',
    '0x6d80113e533a2c0fe82eabd35f1875dcea89ea97',
    '0x625e7708f30ca75bfd92586e17077590c60eb4cd',
    '0x078f358208685046a11c85e8ad32895ded33a249',
    '0xe50fa9b3c56ffb159cb0fca61f5c9d750e8128c8',
  ],
} as const

export const DEFAULT_STAKE_TOKEN_LIST: {
  [chainId: number]: readonly Address[]
} = {
  [ETH_CHAIN_ID]: [
    '0xcafe001067cdef266afb7eb5a286dcfd277f3de5', //PSP
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', //WETH
    ETH_TOKEN_ADDRESS,
  ],
  [OPTIMISM_CHAIN_ID]: [
    '0xd3594e879b358f430e20f82bea61e83562d49d48', //PSP
    '0x4200000000000000000000000000000000000006', //WETH
    ETH_TOKEN_ADDRESS,
  ],
} as const
