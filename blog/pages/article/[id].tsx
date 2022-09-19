import type {InferGetStaticPropsType, NextPage } from 'next'
import CommonMeta from '../../components/CommonMeta/CommonMeta'
import ReactMarkdown from 'react-mark'
import {AccordionDetails, AccordionSummary, Accordion, Box, Button, Grid, Typography } from '@mui/material'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import CustomizedAccordions from "../../components/Nav/Nav"

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Article: NextPage<Props> = ( {article,category,post_id} ) => {
  return (
    <>
      <CommonMeta
        title={article.attributes.title}
        description={article.attributes.description}
      />
      <Grid container>
        <Grid
          className='mt-3'
          item xs={12} md={3}
        >
          <CustomizedAccordions
            article_id={article.attributes.category.data.id}
            category={category}
            post_id={post_id}
          />
        </Grid>
        <Grid className="pt-5" item xs={12} md={9}>
          <article className="pl-2 pr-2">
            <ReactMarkdown>{article.attributes.content}</ReactMarkdown>
          </article>
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