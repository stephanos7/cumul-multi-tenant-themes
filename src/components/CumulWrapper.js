import { CumulioDashboardComponent } from "@cumul.io/react-cumulio-dashboard";
import { useRef } from "react";

export const CumulioWrapper = ({ dashboardKey, dashboardToken }) => {
  const ref = useRef(null);
  return (
    <CumulioDashboardComponent
      ref={ref}
      authKey={dashboardKey}
      authToken={dashboardToken}
      dashboardId="97449715-61ed-4c04-80cd-98b9b84c884d"
      switchScreenModeOnResize={false}
      loaderSpinnerColor="rgb(0, 81, 126)"
      loaderSpinnerBackground="rgb(236 248 255)"
      itemsRendered={(e) => console.log("itemsRendered", e)}
    ></CumulioDashboardComponent>
  );
};
