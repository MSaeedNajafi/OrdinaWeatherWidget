import React, { FormEvent } from "react";

import styles from "./form.module.css";

type FormProps = {
  city: string;
  handleChanage: (e: any) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
};

const Form: React.FC<FormProps> = ({ city, handleChanage, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        placeholder="Type a city"
        type="text"
        name="City Name"
        onChange={handleChanage}
        value={city}
        className={styles.input}
      />
      <button
        className={styles.button}
        type="submit"
        disabled={city.length < 1}
      >
        Submit
      </button>
    </form>
  );
};
export default Form;
