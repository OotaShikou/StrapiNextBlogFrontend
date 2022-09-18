import type {InferGetStaticPropsType, NextPage } from 'next'
import Typography from '@mui/material/Typography';
import CommonMeta from '../../components/CommonMeta/CommonMeta'
import ReactMarkdown from 'react-mark';


type Props = InferGetStaticPropsType<typeof getStaticProps>

const Article: NextPage<Props> = ( {blog} ) => {
  return (
    <>
      <CommonMeta></CommonMeta>
      
      {blog.data.map((item: any) => (
        <div key={item.id}>
          <Typography variant="h4" sx={{ my: 2 }}>
            {item.attributes.title}
          </Typography>
          <Typography variant="h6" sx={{ my: 2 }}>
            {item.attributes.meta_description}
          </Typography>
          <article>
           <ReactMarkdown>{item.attributes.content}</ReactMarkdown>
          </article>
          <Typography sx={{ my: 2 }}>
            {item.attributes.updatedAt}
          </Typography>
          <hr />
        </div>
      ))}
    </>
  )
}

export const getStaticProps = async () => {

  const res=await fetch("https://strapi-production-66a0.up.railway.app/api/categories/1?populate=*")
  const posts=await res.json();
  
  // console.log(posts.data.attributes.blogs)
  const blog = posts.data.attributes.blogs
  

  return {
    props:{
      blog: blog || null
    }
  }
}

export default Article