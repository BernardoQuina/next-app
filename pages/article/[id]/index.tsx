import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import Meta from '../../../components/Meta'
import { server } from '../../../config'
// import { useRouter } from 'next/router'

interface ArticleProps {
  article: {
    userId: number
    id: number
    title: string
    body: string
    excerpt: string
  }
}

const article: NextPage<ArticleProps> = ({ article }) => {
  // const router = useRouter()

  // const { id } = router.query

  return (
    <>
      <Meta title={article.title} description={article.excerpt} />
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <br />
      <Link href='/'>Home</Link>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(`${server}/api/articles/${context.params?.id}`)

  const article = await res.json()

  return {
    props: {
      article,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${server}/api/articles`)

  const articles: { id: number }[] = await res.json()

  const ids = articles.map((article) => article.id)

  const paths = ids.map((id) => ({ params: { id: id.toString() } }))

  return {
    paths,
    fallback: false,
  }
}

// export const getStaticProps: GetStaticProps = async (context) => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${context.params?.id}`
//   )

//   const article = await res.json()

//   return {
//     props: {
//       article,
//     },
//   }
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/`)

//   const articles: { id: number }[] = await res.json()

//   const ids = articles.map((article) => article.id)

//   const paths = ids.map((id) => ({ params: { id: id.toString() } }))

//   return {
//     paths,
//     fallback: false
//   }
// }

export default article
