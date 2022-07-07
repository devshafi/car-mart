import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
} from "@mui/material";
import { CarModel } from "../models/Car";
import Typography from "@mui/material/Typography";
import { ExpandMore } from "@mui/icons-material";
import Link from "next/link";

export interface CarCardProps {
  car: CarModel;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <Link href={`/car/${car.make}/${car.model}/${car.id}`}>
      <a style={{ textDecoration: "none" }}>
        <Card>
          <CardHeader
            avatar={<Avatar aria-label="recipe">R</Avatar>}
            title={car.make + " " + car.model}
            subheader={`£ ${car.price}`}
          />
          <CardMedia
            component="img"
            height="194"
            image={car.photoUrl}
            alt={car.make + " " + car.model}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {car.details}
            </Typography>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}