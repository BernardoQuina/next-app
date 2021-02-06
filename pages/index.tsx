import Head from 'next/head'
// import styles from '../styles/Home.module.css'

interface HomeProps {
  articles: {
    userId: number
    id: number
    title: string
  }[]
}


const Home = ({ articles }: HomeProps) => {
  return (
    <div>
      <Head>
        <title>WebDev News</title>
        <meta name='keywords' content='web development, programming' />
      </Head>
      {articles.map(article => <h3 key={article.id}>{article.title}</h3>)}
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`)
  const articles = await res.json()

  return {
    props: {
      articles
    }
  }
}

export default Home
