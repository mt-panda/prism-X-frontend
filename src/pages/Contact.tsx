import { Grid } from "@mui/material";
import React, { useRef } from "react";
import PageHeader from "../components/UI/PageHeader";
import ContactCard from "../components/Contact/ContactCard";
import ContactForm from "../components/Contact/ContactForm";
import contactBanner from "../assets/images/contactBanner.jpg";

const Contact: React.FC = () => {
  const formRef = useRef<HTMLDivElement | null>(null);

  return (
    <Grid>
      <PageHeader image={contactBanner} page="Contact" />
      <ContactCard />
      <div ref={formRef}>
        <ContactForm />
      </div>
    </Grid>
  );
};

export default Contact;
