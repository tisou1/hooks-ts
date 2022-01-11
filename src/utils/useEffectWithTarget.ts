import { useEffect } from "react";
import createUpdateEffect from "../hooks/createUpdateEffect";

const useEffectWitchTarget = createUpdateEffect(useEffect)

export default useEffectWitchTarget