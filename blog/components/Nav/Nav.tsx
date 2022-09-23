import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `none`,
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 1)',
  border: "none",
  borderBottom:"0.1px solid #ddd",
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginRight: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  border: "none",
  padding: 0
}));

export default function CustomizedAccordions(
  {category,post_id,article_id}: 
  {category: any,post_id: any, article_id: any})
{
  const [expanded, setExpanded] = React.useState<number | false>(article_id);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Box className='sticky top-16'>
      {category.map((item: any) => (
      <div key={item.id}>
        <Accordion expanded={expanded === item.id} onChange={handleChange(item.id)}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography className="font-bold flex items-center">
              <img width="26" className='mr-2' src={item.attributes.icon.data.attributes.url}/>
              {item.attributes.name}
              </Typography>
          </AccordionSummary>
          <Box>
            <AccordionDetails>
              {item.attributes.blogs.data.map((item: any) => (
                <Box sx={{ ml: 3 }} key={item.id}>
                  <Button 
                    href={"/article/" + item.id}
                    disabled = {post_id == item.id}
                    size="small"
                  >
                    <Typography variant="button" className = {post_id == item.id ? "text-blue-600" : "text-slate-500"}>
                      {item.attributes.title}
                    </Typography>
                  </Button>
                </Box>
              ))}
            </AccordionDetails>
          </Box>
        </Accordion>
      </div>
      ))}
    </Box>
  );
}

