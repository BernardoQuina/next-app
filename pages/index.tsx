import { GetStaticProps, NextPage } from 'next'
import ArticleList from '../components/ArticleList'
import { server } from '../config'
// import styles from '../styles/Home.module.css'

interface HomeProps {
  articles: {
    userId: number
    id: number
    title: string
    body: string
    excerpt: string
  }[]
}

const Home: NextPage<HomeProps> = ({ articles }) => {
  return (
    <div>
      <ArticleList articles={ articles } />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${server}/api/articles`)
  const articles = await res.json()

  return {
    props: {
      articles,
    },
  }
}

// export const getStaticProps: GetStaticProps = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`)
//   const articles = await res.json()

//   return {
//     props: {
//       articles,
//     },
//   }
// }

export default Home
