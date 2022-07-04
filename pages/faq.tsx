import { GetStaticProps } from "next";
import React from "react";
import { openDB } from "./openDB";
import { FaqModel } from "./api/Faq";
import { Button } from "@mui/material";

interface FaqProps {
  faq: FaqModel[];
}

export default function Faq({ faq }: FaqProps) {
  return (
    <div>
      {faq.map((f) => (
        <div key={f.id}>
          {f.question} | {f.answer}
        </div>
      ))}
      <Button variant="contained">Contained</Button>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const db = await openDB();
  const faq = await db.all("SELECT * FROM FAQ ORDER BY createDate DESC");

  return { props: { faq } };
};
