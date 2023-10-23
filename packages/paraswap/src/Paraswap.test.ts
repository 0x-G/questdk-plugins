import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import {
  MULTI_DEPOSIT,
  SIMPLE_DEPOSIT,
  PROD_SWAP_SIMPLE,
  SIMPLE_SWAP_ZYBER_TO_ETH,
  SINGLE_SWAP_EURO,
  SINGLE_SWAP_USDC_BTC,
  SWAP_MULTI,
  SWAP_SIMPLE,
  UNISWAP_V3_SWAP,
  WETH_PROD_TEST,
} from './test-transactions'
import { stake, swap } from './Paraswap.js'
import { ARB_ONE_CHAIN_ID, OPTIMISM_CHAIN_ID } from './chain-ids.js'
import { parseEther, type Address } from 'viem'
import { PARASWAP_SWAP_ABI } from './abi.js'
import type { FilterObject, TransactionFilter } from '@rabbitholegg/questdk/dist/types/filter/types'
const USDT_ADDRESS = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9'
const USDCE_ADDRESS = '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8'
const VELA_ADDRESS = '0x088cd8f5ef3652623c22d48b1605dcfe860cd704'
const AUGUSTUS_SWAPPER_ARBITRUM = '0xdef171fe48cf0115b1d80b88dc8eab59176fee57'
const ARB_WETH_ADDRESS = '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'
const ARB_ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
describe('Given the paraswap plugin', () => {
  describe('When handling the swap', () => {
    test('should return a valid action filter', async () => {
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: USDT_ADDRESS.toLowerCase() as Address,
        tokenOut: USDCE_ADDRESS.toLowerCase() as Address,
        amountIn: GreaterThanOrEqual(339000000),
      })

      expect(filter).to.deep.equal({
        chainId: ARB_ONE_CHAIN_ID,
        to: AUGUSTUS_SWAPPER_ARBITRUM,
        input: {
          $abiAbstract: PARASWAP_SWAP_ABI,
          $or: [
            {
              assets: [
                '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
                '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
              ],
              fromAmount: {
                $gte: '339000000',
              },
              funds: {},
            },
            {
              assets: [
                '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
                '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
              ],
              fromAmount: {
                $gte: '339000000',
              },
              funds: {},
            },
            {
              fromAmount: {
                $gte: '339000000',
              },
              fromToken: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
              toToken: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
            },
            {
              fromAmount: {
                $gte: '339000000',
              },
              fromToken: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
              toToken: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
            },
            {
              params: {
                amountIn: {
                  $gte: '339000000',
                },
                tokenIn: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
                tokenOut: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
              },
            },
            {
              params: {
                amountIn: {
                  $gte: '339000000',
                },
                path: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9ff970a61a04b1ca14834a43f5de4533ebddb5cc8',
              },
            },
            {
              data: {
                fromAmount: {
                  $gte: '339000000',
                },
                fromToken: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
                path: {
                  $last: {
                    to: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
                  },
                },
              },
            },
            {
              data: {
                fromToken: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
                fromAmount: {
                  $gte: '339000000',
                },
                toToken: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
              },
            },
          ],
        },
      })
    })

    test('should pass filter with valid simple transactions', async () => {
      const transaction = SWAP_SIMPLE
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: USDT_ADDRESS.toLowerCase() as Address,
        tokenOut: USDCE_ADDRESS.toLowerCase() as Address,
        amountIn: GreaterThanOrEqual(339000000),
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid production simple transactions', async () => {
      const transaction = PROD_SWAP_SIMPLE
      const testFilter: TransactionFilter = {
        to: '0xDEF171Fe48CF0115B1d80b88dc8eAB59176FEe57',
        input: {
          $or: [
            {
              funds: {},
              assets: [
                '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
                '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
              ],
            } as FilterObject,
            {
              funds: {},
              assets: [
                '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
                '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
              ],
            }  as FilterObject,
            {
              toToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
              fromToken: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
            }  as FilterObject,
            {
              toToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
              fromToken: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
            }  as FilterObject,
            {
              params: {
                tokenIn: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
                tokenOut: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
              },
            }  as FilterObject,
            {
              params: {
                path: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1EeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
              },
            }  as FilterObject,
            {
              data: {
                path: {
                  $last: {
                    to: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
                  },
                },
                fromToken: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
              },
            }  as FilterObject,
            {
              data: {
                toToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
                fromToken: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
              },
            }  as FilterObject,
          ],
          $abiAbstract: PARASWAP_SWAP_ABI,
        },
        chainId: 42161,
      }
      expect(apply(transaction, testFilter)).to.be.true
    })
    test('should not pass filter with invalid simple transactions', async () => {
      const transaction = SWAP_SIMPLE
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: USDT_ADDRESS.toLowerCase() as Address,
        tokenOut: USDCE_ADDRESS.toLowerCase() as Address,
        amountIn: GreaterThanOrEqual(339000000000),
      })
      expect(apply(transaction, filter)).to.be.false
    })

    test('should pass filter with valid singe swap WETH -> USDC', async () => {
      const transaction = WETH_PROD_TEST
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: ARB_WETH_ADDRESS.toLowerCase() as Address,
        tokenOut: USDCE_ADDRESS.toLowerCase() as Address,
      })
      expect(apply(transaction, filter)).to.be.true
    })

    test('should pass filter with valid singe swap USDC -> WBTC', async () => {
      const transaction = SINGLE_SWAP_USDC_BTC
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: USDCE_ADDRESS.toLowerCase() as Address,
      })
      expect(apply(transaction, filter)).to.be.true
    })

    test('should pass filter with valid singe swap USDC -> EURO', async () => {
      const transaction = SINGLE_SWAP_EURO
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: USDCE_ADDRESS.toLowerCase() as Address,
      })
      expect(apply(transaction, filter)).to.be.true
    })

    test('should pass filter with valid Uniswap swap', async () => {
      const transaction = UNISWAP_V3_SWAP
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: ARB_ETH_ADDRESS.toLowerCase() as Address,
      })
      expect(apply(transaction, filter)).to.be.true
    })

    test('should pass filter with valid Simple swap Zyber -> ETH', async () => {
      const transaction = SIMPLE_SWAP_ZYBER_TO_ETH
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenOut: ARB_ETH_ADDRESS.toLowerCase() as Address,
      })
      expect(apply(transaction, filter)).to.be.true
    })

    test('should pass filter with valid multi transactions', async () => {
      const transaction = SWAP_MULTI
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: USDCE_ADDRESS.toLowerCase() as Address,
        tokenOut: VELA_ADDRESS.toLowerCase() as Address,
        amountOut: GreaterThanOrEqual(parseEther('0.037')),
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should not pass filter with invalid transactions', async () => {
      const transaction = SWAP_MULTI
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: USDT_ADDRESS.toLowerCase() as Address,
        tokenOut: VELA_ADDRESS.toLowerCase() as Address,
        amountOut: GreaterThanOrEqual(parseEther('0.037')),
      })
      expect(apply(transaction, filter)).to.be.false
    })
    test('should pass filter with valid simple transactions', async () => {
      const transaction = SWAP_SIMPLE
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: USDT_ADDRESS.toLowerCase() as Address,
        tokenOut: USDCE_ADDRESS.toLowerCase() as Address,
        amountIn: GreaterThanOrEqual(339000000),
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should not pass filter with invalid simple transactions', async () => {
      const transaction = SWAP_SIMPLE
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: USDT_ADDRESS.toLowerCase() as Address,
        tokenOut: USDCE_ADDRESS.toLowerCase() as Address,
        amountIn: GreaterThanOrEqual(339000000000),
      })
      expect(apply(transaction, filter)).to.be.false
    })
    test('should pass filter with valid multi transactions', async () => {
      const transaction = SWAP_MULTI
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: USDCE_ADDRESS.toLowerCase() as Address,
        tokenOut: VELA_ADDRESS.toLowerCase() as Address,
        amountOut: GreaterThanOrEqual(parseEther('0.037')),
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should not pass filter with invalid transactions', async () => {
      const transaction = SWAP_MULTI
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: USDT_ADDRESS.toLowerCase() as Address,
        tokenOut: VELA_ADDRESS.toLowerCase() as Address,
        amountOut: GreaterThanOrEqual(parseEther('0.037')),
      })
      expect(apply(transaction, filter)).to.be.false
    })
  })
  describe('When handling the stake', () => {
    test('should pass with a simple deposit', async () => {
      const transaction = SIMPLE_DEPOSIT
      const filter = await stake({
        chainId: OPTIMISM_CHAIN_ID,
        contractAddress: '0x8C934b7dBc782568d14ceaBbEAeDF37cB6348615',
        amountOne: GreaterThanOrEqual(parseEther('46128')),
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass with a multi deposit', async () => {
      const transaction = MULTI_DEPOSIT
      const filter = await stake({
        chainId: OPTIMISM_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        amountOne: GreaterThanOrEqual(parseEther('659')),
      })
      expect(apply(transaction, filter)).to.be.true
    })
  })
})
