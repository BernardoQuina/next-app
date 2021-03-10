import { Variants } from 'framer-motion'

// base variants
export const variants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
  },
}

export const stagger: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export const fadeInUp: Variants = {
  initial: {
    y: 120,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  exit: {
    y: 120,
    opacity: 0,
  },
}

export const backdrop: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: { delay: 0.3 },
  },
}

export const scaleUp: Variants = {
  initial: {
    opacity: 0,
    scaleY: 0.15,
    scaleX: 0.25,
  },
  animate: {
    opacity: 1,
    scaleY: 1,
    scaleX: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    scaleY: 0.15,
    scaleX: 0.25,
    transition: { duration: 0.3 },
  },
}

export const loader: Variants = {
  animationOne: {
    x: [-20, 20],
    y: [0, -30],
    transition: {
      x: {
        yoyo: Infinity,
        duration: 0.5
      },
      y: {
        yoyo: Infinity,
        duration: 0.25,
        ease: 'easeOut'
      }
    }
  },
}