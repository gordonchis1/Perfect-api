import Selector from "../../../../../../../Global/Selector/Selector";
import "./AuthFormSelector.css";

export default function AuthFormSelector({ options, value, field }) {
  //   console.log(field);
  return (
    <div className="auth_form-selector-container">
      <span>{field.label}</span>
      <Selector value={value} onChange={() => {}}>
        <Selector.Trigger label={value} />
        <Selector.Options>
          {options?.map((option) => {
            return (
              <Selector.Option
                key={option.name}
                label={option.label}
                value={option.name}
              />
            );
          })}
        </Selector.Options>
      </Selector>
    </div>
  );
}
