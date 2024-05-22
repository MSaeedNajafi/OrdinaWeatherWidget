import React, { FormEvent } from "react";

import styles from "./form.module.css";

type FormProps = {
  city: string;
  handleChanage: (e: any) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
};

const Form: React.FC<FormProps> = ({ city, handleChanage, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search for a city..."
        type="text"
        name="City Name"
        onChange={handleChanage}
        value={city}
        className={styles.input}
      />
    </form>
  );
};
export default Form;
