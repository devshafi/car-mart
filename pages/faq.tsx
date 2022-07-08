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

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface FaqProps {
  faq: FaqModel[];
}

export default function Faq({ faq }: FaqProps) {
  return (
    <div>
      {faq.map((f) => (
        <Accordion key={f.id}>
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
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
 
  const dbFaqs = await prisma.faq.findMany();
  const faq = JSON.parse(JSON.stringify(dbFaqs));
 
  return { props: { faq } };
};
