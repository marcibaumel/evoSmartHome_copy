// MotionWrapper.tsx
import { motion, MotionProps } from 'framer-motion';
import React, { ReactNode } from 'react';

interface AnimationWrapperProps {
  children: React.ReactNode;
  initial?: MotionProps['initial'];
  animate?: MotionProps['animate'];
  exit?: MotionProps['exit'];
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = <T extends {}>({
  children,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  exit = { opacity: 0, y: -20 },
}: AnimationWrapperProps & T) => {
  return (
    <motion.div initial={initial} animate={animate} exit={exit}>
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;
