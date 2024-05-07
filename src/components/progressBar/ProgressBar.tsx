import "./progressBar.scss";

type Props = {
  pswStrength: string;
  pswStatus: string;
};

function ProgressBar({ pswStrength, pswStatus }: Props) {
  const barStyleOptions = {
    veryWeak: {
      width: `${pswStrength}`,
      height: "100%",
      color: "black",
      fontWeight: "bold",
      padding: "0.2rem",
      borderRadius: "5px",
      backgroundColor: "lightgray",
    },
    weak: {
      width: `${pswStrength}`,
      height: "100%",
      color: "black",
      fontWeight: "bold",
      padding: "0.2rem",
      borderRadius: "5px",
      backgroundColor: "#fa6464",
    },
    moderate: {
      width: `${pswStrength}`,
      height: "100%",
      color: "black",
      fontWeight: "bold",
      padding: "0.2rem",
      borderRadius: "5px",
      backgroundColor: "orange",
    },
    strong: {
      width: `${pswStrength}`,
      height: "100%",
      color: "black",
      fontWeight: "bold",
      padding: "0.2rem",
      borderRadius: "5px",
      backgroundColor: "#f8f86b",
    },
    veryStrong: {
      width: `${pswStrength}`,
      height: "100%",
      color: "white",
      fontWeight: "bold",
      padding: "0.2rem",
      borderRadius: "5px",
      backgroundColor: "lightgreen",
    },
  };
  let barStyle = {};
  switch (pswStatus) {
    case "Very weak":
      barStyle = barStyleOptions.veryWeak;
      break;
    case "Weak":
      barStyle = barStyleOptions.weak;
      break;
    case "Moderate":
      barStyle = barStyleOptions.moderate;
      break;
    case "Strong":
      barStyle = barStyleOptions.strong;
      break;
    case "Very strong":
      barStyle = barStyleOptions.veryStrong;
      break;
  }

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-outer">
        <div style={barStyle}></div>
      </div>
      <div className="password-strength">{pswStatus}</div>
    </div>
  );
}

export default ProgressBar;
