import React from "react";
import { SiVisualstudiocode, SiPostman, SiWebpack, SiFirebase, SiAmazonaws, SiInsomnia } from "react-icons/si";
import { ImGithub } from "react-icons/im";
import { DiNpm } from "react-icons/di";
import StackList from "./StackList";

const tools = [
  { Icon: SiAmazonaws, label: "AWS" },
  { Icon: SiFirebase, label: "Firebase" },
  { Icon: ImGithub, label: "GitHub" },
  { Icon: SiVisualstudiocode, label: "VS Code" },
  { Icon: SiPostman, label: "Postman" },
  { Icon: SiInsomnia, label: "Insomnia" },
  { Icon: SiWebpack, label: "Webpack" },
  { Icon: DiNpm, label: "npm" },
];

function Toolstack() {
  return <StackList title="Tools & platforms" items={tools} />;
}

export default Toolstack;
