import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary p-8 text-secondary mt-8">
      <h3 className="text-xl font-semibold">
        Cornerstone Legacy Training and Advisory Team LLC
      </h3>
      <p>28515 SE Highway 212 Unit 1063 Boring, Oregon 97009</p>
      <p className="text-center text-sm">
        &copy; {new Date().getFullYear()} Cornerstone Legacy Training and
        Advisory Team LLC. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
