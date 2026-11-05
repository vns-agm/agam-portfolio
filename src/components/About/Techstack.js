import React from "react";
import { DiJavascript1, DiReact } from "react-icons/di";
import { FaDocker, FaNode } from "react-icons/fa";
import {
  SiAngular,
  SiApachekafka,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiRedis,
  SiRedux,
  SiTypescript,
} from "react-icons/si";
import { FiShare2 } from "react-icons/fi";
import StackList from "./StackList";

const skills = [
  { Icon: DiJavascript1, label: "JavaScript" },
  { Icon: SiTypescript, label: "TypeScript" },
  { Icon: DiReact, label: "React" },
  { Icon: SiNextdotjs, label: "Next.js" },
  { Icon: SiAngular, label: "Angular" },
  { Icon: SiRedux, label: "Redux" },
  { Icon: FaNode, label: "Node.js" },
  { Icon: SiNestjs, label: "NestJS" },
  { Icon: SiApachekafka, label: "Kafka" },
  { Icon: SiRedis, label: "Redis" },
  { Icon: FiShare2, label: "Distributed systems" },
  { Icon: SiMysql, label: "MySQL" },
  { Icon: FaDocker, label: "Docker" },
];

function Techstack() {
  return <StackList title="Primary stack" items={skills} />;
}

export default Techstack;
