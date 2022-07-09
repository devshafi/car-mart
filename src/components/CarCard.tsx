import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
} from "@mui/material";
import { CarModel } from "../models/Car";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Grid from "@mui/material/Grid";

export interface CarCardProps {
  car: CarModel;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <Link href={`/car/${car.make}/${car.model}/${car.id}`}>
      <a style={{ textDecoration: "none" }}>
        <Card variant="outlined">
          <CardHeader title={car.make + " " + car.model} />
          <Grid sx={{ mx: 2, mt: -1, mb: 2, display: "flex", gap: ".5rem" }}>
            <Typography >{`$ ${car.price}`}</Typography>
            <Chip
              size="small"
              color="secondary"
              label={car.fuelType}
              variant="outlined"
            />
          </Grid>

          <CardMedia
            component="img"
            height="194"
            image={car.photoUrl}
            alt={car.make + " " + car.model}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {car.details.substring(0, 100)}...
            </Typography>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
