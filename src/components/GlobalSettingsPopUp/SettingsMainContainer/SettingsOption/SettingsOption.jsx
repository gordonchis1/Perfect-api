import { userSettingsOptionsMap } from "../../../../utils/userConfiguration/userSettingsConstants";

export default function SettingsOption({ option, section, tab }) {
  const optionMap = userSettingsOptionsMap[option];
  const Component = optionMap.component;

  return (
    <>
      {Component && (
        <Component
          option={option}
          section={section}
          tab={tab}
          //
          title={optionMap.title}
          description={optionMap.description}
          placeholder={optionMap.title}
          //   optional
          alert={optionMap?.alert}
          type={optionMap?.type}
          onChange={optionMap?.onChange}
          options={optionMap?.options}
        />
      )}
    </>
  );
}
