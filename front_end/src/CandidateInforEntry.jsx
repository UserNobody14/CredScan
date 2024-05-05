import { useState } from 'react';
import { Box, TextField, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DossierSkeleton from './DossierSkeleton';


const CandidateEntry = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    linkedin: '',
    github: '',
    twitter: '',
    instagram: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform further actions with the form data here, like submitting it to a server
    console.log(formData);
    // Post to 8000 with "url"
    async function postData() {
      setLoading(true);
      const resp = await fetch('http://localhost:8000/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          github_url: formData.github,
          linkedin_url: formData.linkedin,
          // twitter_url: formData.twitter,
          // instagram_url: formData.instagram,
          name: formData.name,
        }),
      });
      const data = await resp.json();
      localStorage.setItem('profile', JSON.stringify(data));
    }
    postData().then(() => navigate('/dossier'));
  };

  return (
    <Box sx={{width: '600px'}}>
      {
        loading ? <DossierSkeleton /> : null
      }
        <Typography variant='h3' fontWeight="bold" sx={{color: "text.primary"}} gutterBottom>Who are we scanning?</Typography>
        <form onSubmit={handleSubmit} >
        <Grid container spacing={3}>
            <Grid item xs={12}>
            <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                fullWidth
                label="LinkedIn"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                variant="outlined"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                fullWidth
                label="GitHub"
                name="github"
                value={formData.github}
                onChange={handleChange}
                variant="outlined"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                fullWidth
                label="Twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                variant="outlined"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                fullWidth
                label="Instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                variant="outlined"
            />
            </Grid>
            <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" sx={{fontWeight: 'bold'}}>
                Scan
            </Button>
            </Grid>
        </Grid>
        </form>
    </Box>
  );
};

export default CandidateEntry;
