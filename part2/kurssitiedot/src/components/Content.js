import React from "react";
import Part from "./Part";

const Content = (props) => {
  const parts = props.course.parts;
  return (
    <>
      {parts.map((part, i) => (
        <Part key={i} part={part} />
      ))}
    </>
  );
};

export default Content;
