import { NextApiHandler } from 'next'
import { articles } from '../../../data'

const handler: NextApiHandler = (_req, res) => {
  res.status(200).json(articles)
}

export default handler