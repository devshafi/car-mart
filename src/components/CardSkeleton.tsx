import { Card, CardContent, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function CardSkeleton() {
  const numbers = [1, 2, 3, 4, 5, 6];

  const skeletonElements = numbers.map((_, i) => (
    <Grid key={i}  item xs={12} sm={6} md={4}>
      <Card variant="outlined" sx={{ px: 2, py: 1 }}>
        <Skeleton animation="wave" variant="text" width={150} height={60} />
        <Grid sx={{ display: "flex", gap: ".6rem" }}>
          <Skeleton animation="wave" variant="text" width={60} height={40} />
          <Skeleton animation="wave" variant="text" width={40} height={40} />
        </Grid>

        <Skeleton
          sx={{ height: 190, mt: 2 }}
          animation="wave"
          variant="rectangular"
        />
        <CardContent>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </CardContent>
      </Card>
    </Grid>
  ));

  return <Grid container spacing={3}>{skeletonElements}</Grid>;
}