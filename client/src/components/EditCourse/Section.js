import { memo, useState, useRef } from "react";
import proxy from "../../utils/proxy.json";
import axios from "axios";
import { RadioGroup, RadioButton } from "react-radio-buttons";

function Section(props) {
  return <div>{props.section}</div>;
}
export default memo(Section);
