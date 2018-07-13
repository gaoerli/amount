import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Records from "./component/Records";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Records />, document.getElementById("root"));
registerServiceWorker();
