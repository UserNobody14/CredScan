import { Container, CardMedia, Typography, Divider, Grid, Stack } from '@mui/material';
import HighlightCard from './HighlIghtCard';
import DossierSkeleton from './DossierSkeleton';

const DossierPage = () => {
  const loading = false
  const rootStyle = {
    paddingTop: '64px',
    paddingBottom: '64px',
  };

  const sectionStyle = {
    marginBottom: '32px',
    color: 'text.primary'
  };

  const dividerStyle = {
    margin: '24px 0',
  };

  const candidateInfo = {
    name: "John Doe",
    avatar: "https://publicdomainvectors.org/download.php?file=Male-Avatar.svg",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae ipsum nec nisi facilisis sagittis. Phasellus varius nulla at turpis fringilla, eget faucibus odio lobortis. Sed non tortor auctor, tempor sapien eu, tempor lectus.",
    strengths: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    highlights: [
        {
            title: "Highlight title 1",
            codeBase: 'python',
            points: ['point 1', 'point 2', 'point 3'],
            tags: ['langchain', 'python', 'rag']
        },
        {
            title: "Highlight title 2",
            codeBase: 'javascript',
            points: ['point 1', 'point 2', 'point 3'],
            tags: ['webapp', 'servers', 'full-stack']
        },
        {
            title: "Highlight title 3",
            codeBase: 'typescript',
            points: ['point 1', 'point 2', 'point 3'],
            tags: ['ml', 'models', 'pytorch']
        }
    ]
  }

  return (
    <Container maxWidth="md" style={rootStyle}>
        {loading === true ? (
            <DossierSkeleton />
        ) : (
            <>
                <Typography variant="h2" gutterBottom fontWeight="bold" sx={{color: "text.primary"}}>
                    Subject Dossier
                </Typography>
                <Grid container spacing={3} sx={sectionStyle}>
                    <Grid item xs={12} md={4}>
                    <CardMedia image={candidateInfo.avatar} alt="Subject" sx={{height: '200px', width: '200px'}} />
                    </Grid>
                    <Grid item xs={12} md={8}>
                    <Typography variant="h4" gutterBottom  sx={{color: "text.primary"}}>
                        General Info
                    </Typography>
                    <Typography variant="body1" sx={{color: "text.secondary"}}>
                        <strong>Name:</strong> {candidateInfo.name }<br />
                        <strong>Occupation:</strong> Software Engineer <br />
                        <strong>Location:</strong> Seattle, WA <br />
                    </Typography>
                    </Grid>
                </Grid>
                <Divider style={dividerStyle} />
                <Typography variant="h4" gutterBottom sx={sectionStyle} >
                    Summary
                </Typography>
                <Typography variant="body1" sx={{color: "text.secondary"}}>
                    {candidateInfo.summary}
                </Typography>
                <Divider style={dividerStyle} />
                <Typography variant="h4" gutterBottom sx={sectionStyle}>
                    Strengths
                </Typography>
                <Typography variant="body1" sx={{color: "text.secondary"}}>
                    {candidateInfo.strengths}
                </Typography>
                <Divider style={dividerStyle} />
                <Typography variant="h4" gutterBottom sx={sectionStyle}>
                    Productivity Highlights
                </Typography>
                <Stack spacing={2} sx={{color: "text.secondary"}}>
                    {candidateInfo.highlights.map((item) => (
                            <HighlightCard key={item.title} title={item.title} points={item.points} codeBase={item.codeBase} tags={item.tags}/>
                        ))}
                </Stack>
            </>
        )}
    </Container>
  );
};

export default DossierPage;
