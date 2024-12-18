import { IconProps } from "@/types/components";
import * as React from "react";

const ChevronRightIcon = ({ className }: IconProps) => {
  return (
    <svg viewBox="0 0 384 512" fill="currentColor" className={className}>
      <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
    </svg>
  );
};

export default ChevronRightIcon;
