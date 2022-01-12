import { useEffect } from "react";
import createEffectWithTarget from "./createEffectWithTarget";

const useEffectWitchTarget = createEffectWithTarget(useEffect)

export default useEffectWitchTarget