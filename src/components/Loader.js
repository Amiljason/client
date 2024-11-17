import React, { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

function Loader() {
  const [loading] = useState(true);
  const [color] = useState("#000");

  return (
    <div>
      <div
        className="sweet-loading "
        style={{
          textAlign: "center",
          marginTop: "150px",
        }}
      >
        <PulseLoader
          color={color}
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
        />
      </div>
    </div>
  );
}

export default Loader;
