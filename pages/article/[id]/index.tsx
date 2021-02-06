import { GetServerSideProps } from 'next'
import Link from 'next/link'
// import { useRouter } from 'next/router'

interface ArticleProps {
  article: {
    userId: number
    id: number
    title: string
    body: string
  }
}

const article = ({ article }: ArticleProps) => {
  // const router = useRouter()

  // const { id } = router.query

  return (
    <>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <br/>
      <Link href='/'>Home</Link>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${context.params?.id}`
  )

  const article = await res.json()

  return {
    props: {
      article,
    },
  }
}

export default article
