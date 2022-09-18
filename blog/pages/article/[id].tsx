import type {InferGetStaticPropsType, NextPage } from 'next'
import Typography from '@mui/material/Typography';
import CommonMeta from '../../components/CommonMeta/CommonMeta'
import ReactMarkdown from 'react-mark';
import { Grid } from '@mui/material';
import { useRouter } from "next/router";


type Props = InferGetStaticPropsType<typeof getStaticProps>

const Article: NextPage<Props> = ( {article,category} ) => {
  return (
    <>
      <CommonMeta
        title={article.attributes.title}
        description={article.attributes.description}
      />
      <Grid container className="pt-5">
        <Grid item xs={12} md={4}>
          menu
        </Grid>
        <Grid item xs={12} md={8}>
          <article>
            <ReactMarkdown>{article.attributes.content}</ReactMarkdown>
          </article>
        </Grid>
      </Grid>
    </>
  )
}

export const getStaticPaths = async () => {
  // 外部APIエンドポイントを呼び出しデータ取得
  const res_article=await fetch(`https://strapi-production-66a0.up.railway.app/api/blogs`)
  const articles = await res_article.json()  

  // 事前ビルドしたいパスを指定
  const paths = articles.data.map((article: any) => ({
    params: {
      // ファイル名と合わせる ※文字列指定
      id: article.id.toString(),
    },
  }))
  // paths：事前ビルドするパス対象を指定するパラメータ
  // fallback：事前ビルドしたパス以外にアクセスしたときのパラメータ true:カスタム404Pageを表示 false:404pageを表示
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
      category: category || null
    }
  }
}

export default Article