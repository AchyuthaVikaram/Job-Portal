import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/shared/Navbar";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
	FlashMessageProvider,
	useFlashMessage,
} from "./utils/flashMessageContext.jsx"; // Import context provider and hook
import { Snackbar, Alert } from "@mui/material";
import { Provider } from "react-redux";
import Jobs from "./components/Jobs.jsx";
import Browse from "./components/Browse.jsx";
import UserProfile from "./components/UserProfile.jsx";
import JobDescription from "./components/JobDescription.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store.js";
import store from "./redux/store.js";
import Companies from "./components/admin/Companies.jsx";
import CreateCompany from "./components/admin/CreateCompany.jsx";
import CompanySetup from "./components/admin/CompanySetup.jsx";
import AdminJobs from "./components/admin/Jobs.jsx";
import CreateJob from "./components/admin/CreateJob.jsx";
import Applicants from "./components/admin/Applicants.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";
import Footer from "./components/shared/Footer.jsx";

function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={null}>
				<FlashMessageProvider>
					{/* Wrap the entire app in FlashMessageProvider */}
					<BrowserRouter>
						<Navbar />
						<FlashMessageSnackbar />
						{/* Add the Snackbar component here */}
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/jobs" element={<Jobs />} />
							<Route path="/browse" element={<Browse />} />
							<Route path="/user/profile" element={<UserProfile />} />
							<Route path="/description/:id" element={<JobDescription />} />

							{/* admin routes  */}
							<Route
								path="/admin/companies"
								element={
									<ProtectedRoute>
										<Companies />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/admin/companies/create"
								element={
									<ProtectedRoute>
										<CreateCompany />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/admin/companies/:id"
								element={
									<ProtectedRoute>
										<CompanySetup />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/admin/jobs"
								element={
									<ProtectedRoute>
										<AdminJobs />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/admin/jobs/create"
								element={
									<ProtectedRoute>
										<CreateJob />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/admin/jobs/:id/applicants"
								element={
									<ProtectedRoute>
										<Applicants />
									</ProtectedRoute>
								}
							/>
						</Routes>
						<Footer />
					</BrowserRouter>
				</FlashMessageProvider>
			</PersistGate>
		</Provider>
	);
}

function FlashMessageSnackbar() {
	const { message, showMessage } = useFlashMessage();

	return (
		<Snackbar
			open={!!message.content}
			autoHideDuration={3000}
			onClose={() => showMessage("", "")}
		>
			<Alert
				onClose={() => showMessage("", "")}
				severity={message.type}
				sx={{ width: "100%" }}
			>
				{message.content}
			</Alert>
		</Snackbar>
	);
}

export default App;
