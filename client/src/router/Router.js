// ** React Imports
import { Suspense, useContext, lazy } from "react";

// ** Utils
import { isUserLoggedIn } from "@utils";
import { useLayout } from "@hooks/useLayout";
import { AbilityContext } from "@src/utility/context/Can";
import { useRouterTransition } from "@hooks/useRouterTransition";

// ** Custom Components
// import Spinner from '@components/spinner/Loading-spinner' // Uncomment if your require content fallback
import LayoutWrapper from "@layouts/components/layout-wrapper";

// ** Router Components
import {
  BrowserRouter as AppRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// ** Routes & Default Routes
import { DefaultRoute, Routes } from "./routes";

// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import { useSelector } from "react-redux";
import PrivateRoute from "../components/PrivateRoute";

const Router = () => {
  // ** Hooks
  const [layout, setLayout] = useLayout();
  const [transition, setTransition] = useRouterTransition();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(userInfo, "route");

  // ** ACL Ability Context
  const ability = useContext(AbilityContext);

  // ** Default Layout
  const DefaultLayout =
    layout === "horizontal" ? "HorizontalLayout" : "VerticalLayout";

  // ** All of the available layouts
  const Layouts = { BlankLayout, VerticalLayout, HorizontalLayout };

  // ** Current Active Item
  const currentActiveItem = null;

  // ** Return Filtered Array of Routes & Paths
  const LayoutRoutesAndPaths = (layout) => {
    const LayoutRoutes = [];
    const LayoutPaths = [];

    if (Routes) {
      Routes.filter((route) => {
        // ** Checks if Route layout or Default layout matches current layout
        if (
          route.layout === layout ||
          (route.layout === undefined && DefaultLayout === layout)
        ) {
          LayoutRoutes.push(route);
          LayoutPaths.push(route.path);
        }
      });
    }

    return { LayoutRoutes, LayoutPaths };
  };

  const NotAuthorized = lazy(() => import("@src/views/NotAuthorized"));

  // ** Init Error Component
  const Error = lazy(() => import("@src/views/Error"));
  // Reset paswword
  const Reset = lazy(() => import("../views/authScreens/ResetPasswordV2"));
  // Default page
  const DefaultPage = lazy(() => import("../views/authScreens/Login"));
  // Confirm Emailpage
  const EmailConfirm = lazy(() => import("../views/authScreens/ConfirmEmail"));

  // ** Return Route to Render
  const ResolveRoutes = () => {
    return Object.keys(Layouts).map((layout, index) => {
      // ** Convert Layout parameter to Layout Component
      // ? Note: make sure to keep layout and component name equal

      const LayoutTag = Layouts[layout];

      // ** Get Routes and Paths of the Layout
      const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout);
      const routerProps = {};

      return (
        <PrivateRoute path={LayoutPaths} key={index}>
          <LayoutTag
            routerProps={routerProps}
            layout={layout}
            setLayout={setLayout}
            transition={transition}
            setTransition={setTransition}
            currentActiveItem={currentActiveItem}
          >
            <Switch>
              {LayoutRoutes.map((route) => {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact === true}
                    render={(props) => {
                      // ** Assign props to routerProps
                      Object.assign(routerProps, {
                        ...props,
                        meta: route.meta,
                      });

                      return (
                        <Suspense fallback={null}>
                          {/* Layout Wrapper to add classes based on route's layout, appLayout and className */}
                          <LayoutWrapper
                            layout={DefaultLayout}
                            transition={transition}
                            setTransition={setTransition}
                            /* Conditional props */
                            /*eslint-disable */
                            {...(route.appLayout
                              ? {
                                  appLayout: route.appLayout,
                                }
                              : {})}
                            {...(route.meta
                              ? {
                                  routeMeta: route.meta,
                                }
                              : {})}
                            {...(route.className
                              ? {
                                  wrapperClass: route.className,
                                }
                              : {})}
                            /*eslint-enable */
                          >
                            <route.component {...props} />
                            {/* <FinalRoute route={route} {...props} /> */}
                          </LayoutWrapper>
                        </Suspense>
                      );
                    }}
                  />
                );
              })}
            </Switch>
          </LayoutTag>
        </PrivateRoute>
      );
    });
  };

  return (
    <AppRouter basename={process.env.REACT_APP_BASENAME}>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return (userInfo && userInfo !== null) || userInfo !== undefined ? (
              <Redirect to={DefaultRoute} />
            ) : (
              <Redirect to="/login" />
            );
          }}
        />
        {ResolveRoutes()}
        <Route
          path="/api/v1/auth/resetpassword/:resettoken"
          component={Reset}
        />
        {/* Email Confirm */}
        <Route path="/confirmemail" component={EmailConfirm} />
        {/* NotFound Error page */}
        <Route path="*" component={Error} />/
      </Switch>
    </AppRouter>
  );
};

export default Router;
