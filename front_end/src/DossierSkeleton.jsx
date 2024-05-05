import { Container, Skeleton, Stack } from '@mui/material';

const DossierSkeleton = () => {
  return (
    <Container sx={{width: '800px'}}>
      {/* Subject Dossier */}
      <Skeleton variant="rectangular" width={200} height={200} sx={{ borderRadius: '20px', mb: 2 }} />

      {/* Summary */}
      <Skeleton variant="rectangular" width="60%" height={50} sx={{ marginBottom: '8px', mt: 2 }} />
      <Skeleton variant="text" width="100%" height={30} />
      <Skeleton variant="text" width="100%" height={30} />
      
      {/* Strengths */}
      <Skeleton variant="rectangular" width="40%" height={50} sx={{ marginBottom: '8px', mt: 2 }} />
      <Skeleton variant="text" width="100%" height={30} />
      <Skeleton variant="text" width="100%" height={30} />
      
      {/* Productivity Highlights */}
      <Stack sx={{width: '100%', mt: 2}} direction="row" spacing={2} alignItems="flex-start">
        <Skeleton variant="rectangular" width={300} height={200} sx={{borderRadius: '20px'}} />
        <Stack spacing={2} sx={{width: '100%'}}>
            <Skeleton variant="rectangular" width="100%" height={20} />
            <Skeleton variant="rectangular" width="70%" height={20} />
            <Skeleton variant="rectangular" width="70%" height={20} />
        </Stack>
      </Stack>
      <Stack sx={{width: '100%', mt: 2}} direction="row" spacing={2} alignItems="flex-start">
        <Skeleton variant="rectangular" width={300} height={200} sx={{borderRadius: '20px'}} />
        <Stack spacing={2} sx={{width: '100%'}}>
            <Skeleton variant="rectangular" width="100%" height={20} />
            <Skeleton variant="rectangular" width="70%" height={20} />
            <Skeleton variant="rectangular" width="70%" height={20} />
        </Stack>
      </Stack>
      <Stack sx={{width: '100%', mt: 2}} direction="row" spacing={2} alignItems="flex-start">
        <Skeleton variant="rectangular" width={300} height={200} sx={{borderRadius: '20px'}} />
        <Stack spacing={2} sx={{width: '100%'}}>
            <Skeleton variant="rectangular" width="100%" height={20} />
            <Skeleton variant="rectangular" width="70%" height={20} />
            <Skeleton variant="rectangular" width="70%" height={20} />
        </Stack>
      </Stack>
      
    </Container>
  );
};

export default DossierSkeleton;
