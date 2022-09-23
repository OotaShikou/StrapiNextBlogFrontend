import type {InferGetStaticPropsType, NextPage } from 'next'
import CommonMeta from '../../components/CommonMeta/CommonMeta'
import { Grid, Box } from '@mui/material'
import CustomizedAccordions from "../../components/Nav/Nav"
import ReactMarkdown from "react-markdown";
import CodeBlock from "../../components/CodeBlock/CodeBlock"

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Article: NextPage<Props> = ( {article,category,post_id} ) => {

  return (
    <>
      <CommonMeta
        title={article.attributes.title}
        description={article.attributes.description}
      />
      <Grid container spacing={2} sx={{ pt: 5, pb: 2 }}>
        <Grid item xs={12} md={9}>
          <Box sx={{ background: "white", borderRadius: 1, p: 2 }}>
            <article>
              <ReactMarkdown
                children={article.attributes.content}
                components={{
                  code: CodeBlock,
                }}
              />
            </article>
          </Box>
        </Grid>
        <Grid
          item xs={12} md={3}
        >
          <Box sx={{ background: "white", borderRadius: 1, p: 2 }}>
            <CustomizedAccordions
              article_id={article.attributes.category.data.id}
              category={category}
              post_id={post_id}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export const getStaticPaths = async () => {
  const res_article=await fetch(`https://strapi-production-66a0.up.railway.app/api/blogs`)
  const articles = await res_article.json()  

  const paths = articles.data.map((article: any) => ({
    params: {
      id: article.id.toString(),
    },
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async (params: any) => {

  const post_id = params.params.id

  const res_category=await fetch("https://strapi-production-66a0.up.railway.app/api/categories?populate=*")
  const res_article=await fetch(`https://strapi-production-66a0.up.railway.app/api/blogs/${post_id}?populate=*`)

  const categories=await res_category.json();
  const articles =await res_article.json();

  const category = categories.data
  const article = articles.data
  

  return {
    props:{
      // categories: categories || null,
      article: article || null,
      category: category || null,
      post_id: post_id,
    }
  }
}

export default Article