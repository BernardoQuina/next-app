import { useRouter } from 'next/router'

interface ArticleProps {}

const article = ({}: ArticleProps) => {
  const router = useRouter()

  const { id } = router.query

  return <div>this is in article {id}</div>
}

export default article
