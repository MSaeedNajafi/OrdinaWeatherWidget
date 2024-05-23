import React, { FormEvent } from "react";
import Image from "next/image";
import styles from "./SVGIcon.module.css";

interface SVGIconProps {
  icon: string;
  width: number;
  height: number;
  alt?: string;
  handleClick?: (e: FormEvent) => Promise<void>;
}

const SVGIcon: React.FC<SVGIconProps> = ({
  icon,
  width,
  height,
  alt = "",
  handleClick,
}) => {
  return (
    <Image
      src={icon}
      alt={alt}
      width={width}
      height={height}
      onClick={handleClick}
      className={styles.icon}
    />
  );
};

export default SVGIcon;
