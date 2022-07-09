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

interface FaqProps {
  faq: FaqModel[];
}

export default function Faq({ faq }: FaqProps) {
  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={6}>
        <Typography variant="h4" gutterBottom>
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
      <Grid item sm={12} md={6}>
        <Image
          src="/faq.svg"
          width={"500px"}
          height={"500px"}
          alt=""
          loading="lazy"
        />
      </Grid>
    </Grid>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const dbFaqs = await prisma.faq.findMany();
  const faq = JSON.parse(JSON.stringify(dbFaqs));

  return { props: { faq } };
};
