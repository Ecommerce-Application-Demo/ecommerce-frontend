
export const oldOtpCardVariants = (completeStep1) => ({
    desktop: {
      scale: completeStep1 ? 0.9 : 1.1,
      x: completeStep1 ? 0 : 300,
      zIndex: completeStep1 ? 0 : 300,
    },
    tablet: {
      scale: completeStep1 ? 0.9 : 1.1,
      x: completeStep1 ? 0 : '100%',
      zIndex: completeStep1 ? 0 : 300,
    },
    mobile: {
      scale: completeStep1 ? 0.8 : 1,
      y: completeStep1 ? 100 : '100%',
      zIndex: completeStep1 ? 0 : 300,
    }
  });
  
  export const newEmailCardVariants = (completeStep1, completeStep2) => ({
    desktop: {
      scale: completeStep1 && !completeStep2 ? 1.1 : 0.9,
      zIndex: completeStep1 && !completeStep2 ? 300 : 1,
      x: completeStep1 && !completeStep2 ? 20 : -20,
    },
    tablet: {
      scale: completeStep1 && !completeStep2 ? 1.1 : 0.9,
      x: completeStep1 && !completeStep2 ? -30 : 20,
      zIndex: completeStep1 && !completeStep2 ? 300 : 1,
    },
    mobile: {
      scale: completeStep1 && !completeStep2 ? 1 : 0.9,
      y: completeStep1 && !completeStep2 ? 0 : -10,
      zIndex: completeStep1 && !completeStep2 ? 300 : 1,
    }
  });
  
  export const newOtpCardVariants = (completeStep1, completeStep2) => ({
    desktop: {
      scale: completeStep1 && completeStep2 ? 1.1 : 0.7,
      x: completeStep1 && completeStep2 ? 0 : -290,
      zIndex: completeStep1 && completeStep2 ? 300 : 0,
    },
    tablet: {
      scale: completeStep1 && completeStep2 ? 1.1 : 0.7,
      x: completeStep1 && completeStep2 ? -50 : '-100%',
      zIndex: completeStep1 && completeStep2 ? 300 : 0,
    },
    mobile: {
      scale: completeStep1 && completeStep2 ? 1 : 0.5,
      y: completeStep1 && completeStep2 ? -125 : -220,
      zIndex: completeStep1 && completeStep2 ? 300 : 1,
    }
  });
  