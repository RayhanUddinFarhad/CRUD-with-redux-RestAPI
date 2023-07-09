import Lottie from "lottie-react";
import loading from "../anim/loading.json";

const Loading = () => {
    return <Lottie className="w-96 mx-auto" animationData={loading} />;

};

export default Loading;