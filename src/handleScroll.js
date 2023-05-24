const handleScroll = (callback) => {
  let lastScrollY = 0;
  let assembleAnimation = false;
  let disassembleAnimation = false;
  let sphereAnimation = false;
  let tetrahedronAnimation = false;

  window.addEventListener("scroll", () => {
    const scrollThreshold = 200;
    const disassembleThreshold = 800;
    const sphereThreshold = 1400;
    const tetrahedronThreshold = 2000;
    const scrollY = window.scrollY;

    if (scrollY > scrollThreshold && !assembleAnimation) {
      assembleAnimation = true;
      disassembleAnimation = false;
    }
    if (scrollY > disassembleThreshold && !disassembleAnimation) {
      assembleAnimation = false;
      disassembleAnimation = true;
    } else if (scrollY < disassembleThreshold && disassembleAnimation) {
      disassembleAnimation = false;
      assembleAnimation = true;
    } else if (scrollY < scrollThreshold && assembleAnimation) {
      assembleAnimation = false;
    }

    if (scrollY > sphereThreshold && !sphereAnimation) {
      assembleAnimation = false;
      disassembleAnimation = false;
      sphereAnimation = true;
    } else if (scrollY < sphereThreshold && sphereAnimation) {
      sphereAnimation = false;
      disassembleAnimation = true;
    }

    if (scrollY > tetrahedronThreshold && !tetrahedronAnimation) {
      assembleAnimation = false;
      disassembleAnimation = false;
      sphereAnimation = false;
      tetrahedronAnimation = true;
    } else if (scrollY < tetrahedronThreshold && tetrahedronAnimation) {
      tetrahedronAnimation = false;
      disassembleAnimation = true;
    }

    callback(
      scrollY,
      lastScrollY,
      assembleAnimation,
      disassembleAnimation,
      sphereAnimation,
      tetrahedronAnimation
    );
    lastScrollY = scrollY;
  });
};

export default handleScroll;
