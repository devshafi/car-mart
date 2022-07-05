import { GetStaticProps } from "next";
import React from "react";
import { openDB } from "./openDB";
import { FaqModel } from "../src/models/Faq";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  const db = await openDB();
  const faq = await db.all("SELECT * FROM FAQ ORDER BY createDate DESC");

  return { props: { faq } };
};
