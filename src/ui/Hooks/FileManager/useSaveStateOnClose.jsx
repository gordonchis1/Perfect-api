import { useEffect } from "react";
import { useProjectStore } from "../../stores/ProjectStore";

export default function useSaveStateOnClose() {
    const resetProjectStore = useProjectStore((state) => state.reset);

    useEffect(() => {
        console.log("implementar esto")
    }, []);
}
