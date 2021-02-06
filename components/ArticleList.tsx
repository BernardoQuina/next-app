import articleStyles from '../styles/Article.module.css'
import ArticleItem from './ArticleItem'

interface ArticleListProps {
  articles: {
    userId: number
    id: number
    title: string
    body: string
  }[]
}

const ArticleList = ({ articles }: ArticleListProps) => {
  return (
    <div className={articleStyles.grid}>
      {articles.map((article) => (
        <ArticleItem article={article} key={article.id} />
      ))}
    </div>
  )
}

export default ArticleList
