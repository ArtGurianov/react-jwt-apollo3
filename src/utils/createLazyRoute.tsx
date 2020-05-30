import { RouteComponentProps } from "@reach/router";
import React from "react";

export function createLazyRoute<T extends RouteComponentProps>(
  RouteComponent: React.ComponentType<T>
) {
  return function (props: T) {
    return (
      <React.Suspense fallback={<div>Loading lazily :)</div>}>
        <RouteComponent {...props} />
      </React.Suspense>
    );
  };
}
