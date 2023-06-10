import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SettingPage from "./pages/SettingPage";
import AdminPage from "./pages/AdminPage";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthenticationProvider } from "./components/Authentication";
import ErrorHandler from "./components/ErrorHandler";
import RequireAuth from "./components/RequireAuth";
import RequireOrganization from "./components/RequireOrganization";
import WelcomePage from "./pages/WelcomePage";
import AboutPage from "./pages/AboutPage"
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          {/* <CreateGroup /> */}
          <ErrorHandler>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<LandingPage />}></Route>
                  <Route
                    path="/main"
                    element={
                      <AuthenticationProvider>
                        <RequireAuth>
                          <RequireOrganization>
                            <MainPage />
                          </RequireOrganization>
                        </RequireAuth>
                      </AuthenticationProvider>
                    }
                  ></Route>
                  <Route path="/login" element={<LoginPage />}></Route>
                  <Route path="/signup" element={<SignupPage />}></Route>
                  <Route path="/settings" 
                         element={
                          <AuthenticationProvider>
                            <RequireAuth>
                              <SettingPage />
                            </RequireAuth>
                          </AuthenticationProvider>
                  }></Route>
                  <Route path="/about" element={<AboutPage />}></Route>
                  <Route
                    path="/welcome"
                    element={
                      <AuthenticationProvider>
                        <RequireAuth>
                          <WelcomePage />
                        </RequireAuth>
                      </AuthenticationProvider>
                    }
                  ></Route>
                  <Route
                    path="/admin"
                    element={
                      <AuthenticationProvider>
                        <RequireAuth>
                          <RequireOrganization>
                            <AdminPage />
                          </RequireOrganization>
                        </RequireAuth>
                      </AuthenticationProvider>
                    }
                  ></Route>
                </Routes>
              </BrowserRouter>
          </ErrorHandler>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
};

export default App;
