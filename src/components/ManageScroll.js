// https://gist.github.com/ryanflorence/39a37a85254159fd7a5ca54027e175dc
import { Location } from "@reach/router";
import React from "react";

let scrollPositions = {};

const ManageScrollImpl = ({ location }) => {
  React.useEffect(() => {
    if (location.href) {
      window.scrollTo(0, scrollPositions[location.href || 0]);
    }
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.href]);

  const listener = () => {
    if (location && location.href) {
      scrollPositions[location.href] = window.scrollY;
    }
  };

  return null;
};

export const ManageScroll = () => (
  <Location>
    {({ location }) => <ManageScrollImpl location={location} />}
  </Location>
);
