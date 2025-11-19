import "./CodeGeneratorTargetSelector.css";
import { useState, useEffect } from "react";
import { availableTargets } from "httpsnippet-lite";
import CodeGeneratorSelector from "../CodeGeneratorSelector/CodeGeneratorSelector";

const defaultTarget = "javascript";

export default function CodeGeneratorTargetSelector({
  setCurrentTarget,
  currentTarget,
  setClient,
}) {
  const [targets, setTargets] = useState(null);

  useEffect(() => {
    if (!targets) return;

    const findDefaultTarget = () => {
      return targets.filter((target) => target.key == defaultTarget)[0];
    };

    setCurrentTarget(findDefaultTarget());
    setClient(findDefaultTarget().clients[0]);
  }, [targets]);

  useEffect(() => {
    setTargets(availableTargets());
  }, []);

  const handleOnChangeTarget = (target) => {
    setCurrentTarget(target);
    setClient(target.clients[0]);
  };

  return (
    <CodeGeneratorSelector
      currentValue={currentTarget}
      items={targets}
      onChange={handleOnChangeTarget}
    />
  );
}
