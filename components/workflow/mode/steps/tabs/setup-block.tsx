import { SetupProps } from "@/types/workflow";
import CodeBlock from "../code-block";

export default function SetupBlock({ setup }: { setup: SetupProps }) {
  return <CodeBlock content={setup} />;
}
