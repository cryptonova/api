/* eslint-disable no-undef */
process.env.NODE_ENV = 'test'
const { assert } = require('chai')
const updateCoin = require('../../functions/coins/updateCoin')

describe('coins', () => {
  describe('- updateCoin', () => {
    it('updates a coin and returns the data', async () => {
      const id = 1
      const input = {
        url: 'https://bitcoin.org',
        whitePaperUrl: 'https://bitcoin.org/bitcoin.pdf',
        videoUrl: 'https://www.youtube.com/watch?v=Gc2en3nHxA4',
        blogFeedUrl: 'https://bitcoin.org/en/rss/blog.xml'
      }

      const response = await updateCoin(id, JSON.stringify(input))
      const body = response.body

      assert.equal(body.url, input.url)
      assert.equal(body.whitePaperUrl, input.whitePaperUrl)
      assert.equal(body.videoUrl, input.videoUrl)
      assert.equal(body.blogFeedUrl, input.blogFeedUrl)
    })
  })
})
