const Parser = require('rss-parser')
const Coin = require('../../models/Coin')

async function fetchBlogFeed (slug) {
  const coin = await Coin.findBySlug(slug, 'blogFeedUrl')

  if (coin.blogFeedUrl) {
    const feed = await new Parser().parseURL(coin.blogFeedUrl)

    return feed.items.map(item => {
      return {
        author: item.creator || null,
        title: item.title,
        url: item.link,
        pubDate: item.pubDate,
        body: item['content:encoded'] || item.content
      }
    })
  }

  return []
}

module.exports = fetchBlogFeed
