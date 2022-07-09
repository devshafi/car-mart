import { GetStaticProps } from "next";
import React from "react";
import { FaqModel } from "../src/models/Faq";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { prisma } from "../db";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Box from "@mui/material/Box";

interface FaqProps {
  faq: FaqModel[];
}

export default function Faq({ faq }: FaqProps) {
  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={6}>
        <Typography variant="h4" fontWeight={"bold"} gutterBottom>
          Frequently asked questions
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam numquam,
          laboriosam exercitationem quisquam autem voluptates.
        </Typography>
        {faq.map((f) => (
          <Accordion key={f.id} sx={{ mb: 2 }} variant="outlined">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${f.id}-content`}
              id={f.id + ""}
            >
              <Typography>{f.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{f.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
      <Grid
        item
        sm={12}
        md={6}
        display={{ xs: "none", sm: "none", md: "block" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src="/faq-ask.jpg"
            height={"450px"}
            width={"450px"}
            objectFit="cover"
            alt=""
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const dbFaqs = await prisma.faq.findMany();
  const faq = JSON.parse(JSON.stringify(dbFaqs));

  return { props: { faq } };
};
