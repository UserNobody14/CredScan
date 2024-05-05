import { Box, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <Box sx={{ display: 'flex', height: '500px', mx: 'auto'}}>
      <Stack alignItems="center" spacing={3} sx={{ mx: 'auto'}}>
        <Stack alignItems="center">
          <Stack direction="row" spacing={2} alignItems="center">
            <div style={{ borderRadius: '10px', overflow: 'hidden', width: '100px', height: '100px' }}>
              <img src="/Logo.png" alt="Logo" style={{width: '100%', height: 'auto'}} />
            </div>
            <Typography variant="h1" fontWeight="bold" sx={{color: "text.primary"}} >Welcome to Credscan.ai</Typography>
          </Stack>
          <Typography variant="h4" sx={{color: "text.secondary"}}>
          Screen job candidates like a three letter agency.
        </Typography>
        </Stack>
        <Box>
          <Button variant="contained" color="primary" component={Link} to="/candidate-entry" sx={{fontWeight: 'bold'}}>
            Get Started
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Home;
