import { NextApiHandler } from 'next'
import { articles } from '../../../data'

const handler: NextApiHandler = ({ query: { id } }, res) => {
  const filtered = articles.filter((article) => article.id === id)

  if (filtered.length > 0) {
    res.status(200).json(filtered[0])
  } else {
    res.status(404).json({ message: `Article with the id of ${id} not found` })
  }
}

export default handler
