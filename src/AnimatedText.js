import React from "react";
import { useSpring, animated } from "react-spring";
import Typed from "react-typed";

const AnimatedText = () => {
  const textSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 5000 },
    onRest: () => {

    },
  });

  const backgroundSpring = useSpring({
    background: "linear-gradient(118deg, #FFF 0%, #ADF872 95.47%)",
    from: { background: "linear-gradient(118deg, #FFF 0%, #000 95.47%)" },
    config: { duration: 5000 },
  });

  return (
    <animated.div style={backgroundSpring}>
      <div>
        <animated.div style={textSpring}>
          <Typed
            strings={["Ваш текст тут"]}
            typeSpeed={50}
            showCursor={false}
          />
        </animated.div>
      </div>
    </animated.div>
  );
};

export default AnimatedText;

// Щоб цей файл спрацював потрібно в app.js імопорувати його та визначити перед header
