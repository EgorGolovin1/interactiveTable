"use client";
import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

const Portal: FC<Props> = ({ children, isOpen }) => {
  if (!isOpen || !children) return null;
  if (typeof document === "undefined") return null;

  return createPortal(children, document.body);
};

export default Portal;

type Props = {
  children?: ReactNode;
  isOpen?: boolean;
};
