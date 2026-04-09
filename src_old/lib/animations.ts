export const ease = [0.25, 0.46, 0.45, 0.94] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" as const } },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -40, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" as const } },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 40, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" as const } },
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(6px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" as const } },
};

export const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export const staggerFast = {
  visible: { transition: { staggerChildren: 0.06 } },
};
