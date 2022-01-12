import type { DependencyList } from "react";

export default function depsAreSame(
  oldsDeps: DependencyList,
  deps: DependencyList,
): boolean {
  if(oldsDeps === deps) return true
  for(let i = 0; i< oldsDeps.length; i++){
    if(!Object.is(oldsDeps[i], deps[i])) 
      return false
  }
  return true
}
