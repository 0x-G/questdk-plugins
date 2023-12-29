import { type Address, zeroAddress } from 'viem'
import { Chains } from './utils'

// Tokens
const ETHER = zeroAddress
const ARBITRUM_BTC = '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f'
const ARBITRUM_ARB = '0x912ce59144191c1204e64559fe8253a0e49e6548'
const ARBITRUM_CRV = '0x11cdb42b0eb46d95f990bedd4695a6e3fa034978'
const ARBITRUM_LINK = '0xf97f4df75117a78c1a5a0dbb814af92458539fb4'

export const VAULT_CONTRACT = '0xc4abade3a15064f9e3596943c699032748b13352'
export const TOKENFARM_CONTRACT = '0x60b8C145235A31f1949a831803768bF37d7Ab7AA'

export const CHAIN_TO_TOKENS: { [chainId: number]: Address[] } = {
  [Chains.ARBITRUM_ONE]: [
    ETHER,
    ARBITRUM_ARB,
    ARBITRUM_BTC,
    ARBITRUM_CRV,
    ARBITRUM_LINK,
  ],
}
