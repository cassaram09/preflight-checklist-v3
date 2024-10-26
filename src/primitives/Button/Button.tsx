"use client";

import { classes } from "@/helpers/styles.helpers";
import styles from "./Button.module.scss";
import Text, { TextProps } from "../Text/Text";

export type ButtonProps = {
  readonly id?: string;
  readonly onClick?: (e: unknown) => void;
  readonly type?: "button" | "submit";
  readonly className?: string;
  readonly disabled?: boolean;
  readonly text: string;
  readonly textProps?: TextProps;
  readonly variant?: "orange" | "grey";
};

export default function Button({
  id,
  onClick = () => undefined,
  type = "button",
  className = "",
  disabled,
  text,
  textProps = {
    variant: "h6",
  },
  variant = "orange",
}: ButtonProps): JSX.Element {
  const cl = classes(styles);

  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cl(["root", variant, className])}
    >
      <Text text={text} className={cl("text")} {...textProps} />
    </button>
  );
}
