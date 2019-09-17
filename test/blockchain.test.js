const { Blockchain } = require('../src/blockchain.js')

var assert = require('assert')

const MIN_ELAPSED_TIME_BETWEEN_SUBMIT_STARS = 1 * 60 // secs
const TEST_ADDRESS_WALLET = '1F3C1bbV3RJgjeoUzR5h1C9jZmRw3chwCq'
const TEST_EXPECTED_MESSAGE =
  '1F3C1bbV3RJgjeoUzR5h1C9jZmRw3chwCq:100:starRegistry'
const TEST_SIGNATURE =
  'IH5v2giD+/y0bmQuW4VmfVvj5qTyKQlYxlUfqARtiFaGfT7weHcEU+mPeyRDa72YwA64XwlACR2GT3NWPZeZs8c='
const TEST_STAR = 'the most bright star'

describe('Blockchain', () => {
  describe('add one star to blockchain', () => {
    const currentTimeIterator = currentTime([
      100,
      100 + 1 + MIN_ELAPSED_TIME_BETWEEN_SUBMIT_STARS
    ])
    const blockchain = new Blockchain(
      MIN_ELAPSED_TIME_BETWEEN_SUBMIT_STARS,
      () => currentTimeIterator.next().value
    )

    it('requestMessageOwnershipVerification', async () => {
      const message = await blockchain.requestMessageOwnershipVerification(
        TEST_ADDRESS_WALLET
      )

      assert.equal(
        message,
        TEST_EXPECTED_MESSAGE,
        `requestMessageOwnershipVerification is failed`
      )
    })

    let block

    it('submitStar', async () => {
      block = await blockchain.submitStar(
        TEST_ADDRESS_WALLET,
        TEST_EXPECTED_MESSAGE,
        TEST_SIGNATURE,
        TEST_STAR
      )
    })

    it('validateChain', async () => {
      assert.deepEqual(await blockchain.validateChain(), [])
    })

    it('getStarsByWalletAddress', async () => {
      const stars = await blockchain.getStarsByWalletAddress(
        TEST_ADDRESS_WALLET
      )
      assert.deepEqual([TEST_STAR], stars)
    })

    it('getChainHeight', async () => {
      assert.equal(await blockchain.getChainHeight(), 1)
    })

    it('getBlockByHash', async () => {
      assert.deepEqual(await blockchain.getBlockByHash(block.hash), block)
    })

    it('getBlockByHeight', async () => {
      assert.deepEqual(await blockchain.getBlockByHeight(block.height), block)
    })
  })
})

function delay (millis) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, millis)
  })
}

function * currentTime (values) {
  for (value of values) {
    yield value
  }
}
