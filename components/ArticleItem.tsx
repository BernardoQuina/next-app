import articleStyles from '../styles/Article.module.css'
import Link from 'next/link'

interface ArticleItemProps {
  article: {
    userId: number
    id: number
    title: string
    body: string
    excerpt: string
  }
}

const ArticleItem: React.FC<ArticleItemProps> = ({ article }) => {
  return (
    <Link href={`/article/${article.id}`}>
      <a className={articleStyles.card}>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
      </a>
    </Link>
  )
}

export default ArticleItem
