import React from "react";
import { useScrollTrigger, Zoom } from "@material-ui/core";

const ScrollTop = ({ children, ...props }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  function handleScroll() {
    const anchor = document.getElementById("top");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  return (
    <Zoom in={trigger} {...props}>
      <div onClick={handleScroll}>{children}</div>
    </Zoom>
  );
};

export default ScrollTop;
