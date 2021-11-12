import { useState } from 'react';

const className = 'animating';

const useAnimatedIcon = (initialIcon, totalDuration, buttonRef) => {
  const [icon, setIcon] = useState(initialIcon);

  const setWithAnimation = (newIcon) => {
    if (newIcon === icon) return;

    let iconObject = buttonRef.current.children[0];
    iconObject.classList.add(className);

    setTimeout(() => {
      setIcon(newIcon);

      iconObject = buttonRef.current.children[0];
      iconObject.classList.add(className);

      setTimeout(() => {
        iconObject.classList.remove(className);
      }, totalDuration * 500);
    }, totalDuration * 500);
  };

  return [icon, setWithAnimation];
};

export default useAnimatedIcon;
