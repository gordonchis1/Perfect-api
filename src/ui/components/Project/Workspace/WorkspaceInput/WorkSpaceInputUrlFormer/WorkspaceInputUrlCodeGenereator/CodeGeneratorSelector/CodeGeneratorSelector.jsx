import Selector from "../../../../../../Global/Selector/Selector";

export default function CodeGeneratorSelector({
  currentValue,
  onChange,
  items,
}) {
  return (
    <>
      {items && currentValue && (
        <Selector value={currentValue} onChange={onChange}>
          <Selector.Trigger label={currentValue?.title || "Select"} />
          <Selector.Options
            style={{ maxHeight: "40%", overflowY: "auto" }}
            className="custom-scroll-bar"
          >
            {items.map((item) => {
              return (
                <Selector.Option
                  value={item}
                  key={item.key}
                  label={item.title}
                />
              );
            })}
          </Selector.Options>
        </Selector>
      )}
    </>
  );
}
