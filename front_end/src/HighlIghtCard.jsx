import { Stack, CardContent, Box,  CardMedia, Typography } from '@mui/material';


const HighlightCard = ({title, codeBase, points, tags}) => {

    function getUrl(c) {
        switch (c) {
          case 'python':
            return 'https://ks54op3.ru/img/21226807.gif';
          case 'javascript':
            return 'https://res.cloudinary.com/andresbaravalle/image/upload/v1542975073/logo-javascript_2x_cpugmu.png';
          case 'typescript':
            return 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png';
          default:
            return 'https://example.com/default';
        }
      }

  return (
    <Box sx={{display: 'flex', flexDirection: 'row'}}>
        <CardMedia image={getUrl(codeBase)} sx={{height: '200px', width: '200px', borderRadius: '20px'}}/>
        <Stack sx={{ml: 2}}>
            <Typography variant='h5'>{title}</Typography>
            {points.map((item) => (
                 <Typography>-{item}</Typography>
            ))}
            <Stack direction="row" spacing={1} sx={{mt: 'auto'}}>
            {tags.map((item) => (
                 <Typography>#{item}</Typography>
            ))}
            </Stack>
        </Stack>
    </Box>
  );
};

export default HighlightCard;
