import { getUserConfigPath } from "../initUserConfguration";

export const updateConfig = async (newConfig) => {
    try {
        const path = await getUserConfigPath();
        await window.fs.writeTextFile(path, JSON.stringify(newConfig));
    } catch (error) {
        console.error(error);
    }
};
