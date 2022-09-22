import type {InferGetStaticPropsType, NextPage } from 'next'
import Typography from '@mui/material/Typography';
import CommonMeta from '../../components/CommonMeta/CommonMeta'
import { Grid, Box, Autocomplete, TextField, Card, CardActionArea } from '@mui/material';
import { useState } from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>

const CategoryArticleList: NextPage<Props> = ( {blog} ) => {
  let serch_option:any = []
  for (let i = 0; i < blog.attributes.blogs.data.length; i++) {
    const label = blog.attributes.blogs.data[i].attributes.title
    serch_option.push(label)
  }
  const [value, setValue] = useState<string | null>("");
  const [inputValue, setInputValue] = useState('');
  return (
    <>
      <CommonMeta></CommonMeta>
      <Grid container >
        <Grid className='p-3 mt-5 mb-3 mx-auto' item xs={12} md={10}>
          <Typography sx={{ pt: 4, mb: 3 ,mx: 3 }} variant="h4">
            {blog.attributes.name}の記事一覧
          </Typography>
          <Box className='mx-3'>
            <Autocomplete
              value={value}
              freeSolo
              onChange={(event: any, newValue: string | null) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              options={serch_option}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="記事を検索" />}
            />
          </Box> 
        </Grid>
        <Grid className='mt-3 mx-auto' item xs={12} md={10}>
          {blog.attributes.blogs.data.map((item: any) => (
            (
              item.attributes.title.indexOf(value) !== -1
              || item.attributes.title.indexOf(inputValue) !== -1 
            ) && <Box key={item.id} className='mt-3 mx-3'>
              <Card className='border-0' variant="outlined">
                <CardActionArea className='px-3 py-2' href={`/article/${item.id}`}>
                  <Typography>
                    {item.attributes.updatedAt.substring(0,10)}
                  </Typography>
                  <Typography variant="h5">
                    {item.attributes.title}
                  </Typography>
                  <Typography>
                    {item.attributes.description}
                  </Typography>
                </CardActionArea>
              </Card>
            </Box>
          ))}
        </Grid>
      </Grid>
    </>
  )
}

export const getStaticPaths = async () => {
  const res_categories=await fetch(`https://strapi-production-66a0.up.railway.app/api/categories`)
  const categories = await res_categories.json()  

  const paths = categories.data.map((category: any) => ({
    params: {
      id: category.id.toString(),
    },
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async (params: any) => {

  const post_id = params.params.id

  const res=await fetch(`https://strapi-production-66a0.up.railway.app/api/categories/${post_id}?populate=*`)
  const posts=await res.json();
  
  // console.log(posts.data.attributes.blogs)
  const blog = posts.data

  return {
    props:{
      blog: blog || null,
    }
  }
}

export default CategoryArticleList