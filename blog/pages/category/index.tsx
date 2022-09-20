import type {InferGetStaticPropsType, NextPage } from 'next'
import CommonMeta from '../../components/CommonMeta/CommonMeta'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Props = InferGetStaticPropsType<typeof getStaticProps>

const CategoryArticle: NextPage<Props> = ( {category} ) => {
  return (
    <>
      <CommonMeta></CommonMeta>
      <Box sx={{ display:"flex", justifyContent:"center", margin:"auto", flexWrap:"wrap" }}>
        {category.map((item: any) => (
          <Card sx={{ width: 275, margin: 2, display:"flex", flexDirection:"column", justifyContent:"space-between" }}  key={item.id}>
            <CardContent sx={{ pb: 1 }}>
              <Typography sx={{ margin: "auto" }} color="text.secondary" gutterBottom>
                <img width="26" className='m-auto' src={item.attributes.icon.data.attributes.url}/>
              </Typography>
              <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
                {item.attributes.name}
              </Typography>
              <Typography variant="body2" sx={{ mt:1 }}>
                {item.attributes.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "center", pb:2 }}>
              <Button sx={{ background: "#9c27b0 !important" }} size="small" color="secondary" variant="contained">Lead Article</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  )
}

export const getStaticProps = async () => {

  const res=await fetch("https://strapi-production-66a0.up.railway.app/api/categories/?populate=*")
  const categories=await res.json();
  
  // console.log(posts.data.attributes.blogs)
  const category = categories.data
  

  return {
    props:{
      category: category || null
    }
  }
}

export default CategoryArticle