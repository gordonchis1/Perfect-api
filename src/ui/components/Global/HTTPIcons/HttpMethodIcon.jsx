import { File } from "lucide-react";
import Delete from "./Delete";
import Get from "./Get";
import Post from "./Post";
import Put from "./Put";
import { workspaceTypeInput } from "../../../utils/constants/WorkspaceInputConstants";

export default function HttpMethodIcon({ method = "GET" }) {
    const { bg: color } = workspaceTypeInput.find((element) => element.type == method);

    switch (method) {
        case "GET":
            return <Get color={color} />
        case "POST":
            return <Post color={color} />
        case "DELETE":
            return <Delete color={color} />
        case "PUT":
            return <Put color={color} />
        default:
            return <File color={color} />
    }
}
