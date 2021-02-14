import Head from 'next/head'

interface MetaProps {
  title?: string
  keywords?: string
  description?: string
}

export const Meta: React.FC<MetaProps> = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta charSet='utf-8' />
      <link rel='icon' href='/favicon.ico' />
      <link
        href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap'
        rel='stylesheet'
      />
      <title>{title}</title>
    </Head>
  )
}

Meta.defaultProps = {
  title: 'GraphQL Prisma 2',
  keywords: 'graphql, api, prisma, nexus, apollo',
  description: 'Posts fetched from a prisma 2.0 nexus backend',
}
