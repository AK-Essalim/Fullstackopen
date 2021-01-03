import React from "react";

const Total = (props) => {
  const parts = props.course.parts;
  console.log(props);
  return (
    <div>
      <b>
        Number of exercises {parts.reduce((acc, sum) => acc + sum.exercises, 0)}
      </b>
    </div>
  );
};

export default Total;
