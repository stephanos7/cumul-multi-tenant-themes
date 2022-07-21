import { CumulioDashboardComponent } from "@cumul.io/react-cumulio-dashboard";
import { useRef } from "react";

export const CumulioWrapper = ({ dashboardKey, dashboardToken }) => {
  const ref = useRef(null);
  return (
    <CumulioDashboardComponent
      ref={ref}
      authKey={dashboardKey}
      authToken={dashboardToken}
      dashboardId="91ef0336-ec31-48c1-8f25-d28d603b82ec"
      switchScreenModeOnResize={false}
      loaderSpinnerColor="rgb(0, 81, 126)"
      loaderSpinnerBackground="rgb(236 248 255)"
      itemsRendered={(e) => console.log("itemsRendered", e)}
    ></CumulioDashboardComponent>
  );
};
