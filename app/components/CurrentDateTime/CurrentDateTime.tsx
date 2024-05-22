import { formatDateTime } from "@/app/utils/formatDateTime";
import styles from "./CurrentDateTime.module.css";

type CurrentDateTimeProps = {
  currentTime: number;
};

const CurrentDateTime: React.FC<CurrentDateTimeProps> = ({ currentTime }) => {
  const today = new Date(currentTime * 1000);
  const { formattedDate, formattedTime } = formatDateTime(today);

  return (
    <div className={styles.today}>
      <p className={styles.text}>{formattedDate}</p>
      <p className={styles.text}>Local time: {formattedTime}</p>
    </div>
  );
};
export default CurrentDateTime;
