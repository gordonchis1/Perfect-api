import CodeGeneratorSelector from "../CodeGeneratorSelector/CodeGeneratorSelector";

export default function CodeGeneratorClientSelector({
  clients,
  setClient,
  client,
}) {
  return (
    <CodeGeneratorSelector
      items={clients}
      currentValue={client}
      onChange={setClient}
    />
  );
}
