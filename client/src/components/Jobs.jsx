import { useDispatch, useSelector } from "react-redux";
import JobDisplay from "./JobDisplay";
import JobFilter from "./JobFilter";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { JOB_END_POINT } from "../utils/constant";
import { resetFilters } from "../redux/feauters/jobFilter";
import { Button, TextField, Pagination, Box, Typography, CircularProgress } from "@mui/material";

function Jobs() {
	const dispatch = useDispatch();
	const [searchParams] = useSearchParams();
	const companyId = searchParams.get('company');
	const { location, industry, salary } = useSelector(
		(store) => store.jobFilter
	);
	const jobs = useSelector((store) => store.job.alljobs);

	const [filteredJobs, setFilteredJobs] = useState(jobs);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalJobs, setTotalJobs] = useState(0);
	const [loading, setLoading] = useState(false);
	const [searchKeyword, setSearchKeyword] = useState("");
	const [companyName, setCompanyName] = useState("");

	// Reset filters on component mount (i.e., page reload)
	useEffect(() => {
		dispatch(resetFilters()); // Reset the filters on page load
	}, [dispatch]);
	
	const fetchJobs = async (page = 1, keyword = "") => {
		setLoading(true);
		try {
			const params = new URLSearchParams({
				page: page.toString(),
				limit: "9"
			});
			
			// Add search keyword if provided
			if (keyword && keyword.trim()) {
				params.append('keyword', keyword.trim());
			} else if (searchKeyword && searchKeyword.trim()) {
				params.append('keyword', searchKeyword.trim());
			}
			
			// Add individual filters
			if (location && location.trim()) {
				params.append('location', location.trim());
			}
			
			if (salary && salary.trim()) {
				params.append('salary', salary.trim());
			}
			
			if (industry && industry.trim()) {
				params.append('jobType', industry.trim());
			}

			// Add company filter if companyId is present in URL
			if (companyId) {
				params.append('company', companyId);
			}
			
			const res = await axios.get(`${JOB_END_POINT}/get?${params}`, {
				withCredentials: true,
			});
			
			if (res.data.success) {
				setFilteredJobs(res.data.jobs);
				setTotalJobs(res.data.totalJobs || res.data.jobs.length);
				setTotalPages(res.data.totalPages || 1);
				setCurrentPage(res.data.currentPage || page);
			}
		} catch (e) {
			console.log("Error fetching jobs:", e);
			setFilteredJobs([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		// Reset company name when company ID changes
		const fetchCompanyName = async () => {
			if (companyId) {
				try {
					const res = await axios.get(`${JOB_END_POINT}/company/${companyId}`, {
						withCredentials: true,
					});
					if (res.data.success) {
						setCompanyName(res.data.company?.name || '');
					}
				} catch (error) {
					console.error('Error fetching company details:', error);
					setCompanyName('');
				}
			} else {
				setCompanyName('');
			}
		};

		fetchCompanyName();
		fetchJobs(1);
	}, [location, industry, salary, dispatch, companyId]);

	const handleSearch = (e) => {
		e.preventDefault();
		setCurrentPage(1);
		fetchJobs(1, searchKeyword);
	};

	const handlePageChange = (event, page) => {
		setCurrentPage(page);
		fetchJobs(page, searchKeyword);
	};

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
			{/* Company Filter Header */}
			{companyName && (
				<div className="bg-purple-50 rounded-lg p-4 mb-6 border border-purple-100">
					<h2 className="text-lg font-medium text-purple-800">
						Showing jobs from: <span className="font-semibold">{companyName}</span>
					</h2>
					<Button 
						variant="outlined" 
						size="small" 
						onClick={() => window.location.href = '/jobs'}
						className="mt-2"
					>
						Clear Company Filter
					</Button>
				</div>
			)}

			{/* Search Bar */}
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
				<Box component="form" onSubmit={handleSearch}>
					<div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
						<TextField
							fullWidth
							variant="outlined"
							placeholder="Search jobs by title, company, location..."
							value={searchKeyword}
							onChange={(e) => setSearchKeyword(e.target.value)}
							sx={{
								'& .MuiOutlinedInput-root': {
									borderRadius: '8px',
									backgroundColor: '#f9fafb',
									'&:hover': {
										backgroundColor: '#f3f4f6',
									},
									'&.Mui-focused': {
										backgroundColor: '#ffffff',
									}
								}
							}}
						/>
						<Button 
							type="submit" 
							variant="contained" 
							sx={{ 
								minWidth: '120px',
								height: '56px',
								borderRadius: '8px',
								backgroundColor: '#9333ea',
								'&:hover': {
									backgroundColor: '#7c3aed',
								}
							}}
							disabled={loading}
						>
							{loading ? 'Searching...' : 'Search'}
						</Button>
					</div>
				</Box>
			</div>

			<div className="flex flex-col lg:flex-row gap-8">
				<div className="lg:w-80 flex-shrink-0">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<JobFilter />
					</div>
				</div>
				<div className="flex-1 min-w-0">
					{/* Results Summary */}
					<div className="mb-6">
						<Typography variant="h5" className="font-semibold text-gray-900 mb-2">
							{loading ? "Searching..." : `${totalJobs} Jobs Found`}
						</Typography>
						{currentPage > 1 && (
							<Typography variant="body2" className="text-gray-600">
								Page {currentPage} of {totalPages}
							</Typography>
						)}
					</div>

					{/* Loading State */}
					{loading ? (
						<Box display="flex" justifyContent="center" my={8}>
							<CircularProgress />
						</Box>
					) : (
						<>
							{/* Jobs Grid */}
							<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
								{filteredJobs.length === 0 ? (
									<div className="col-span-full text-center py-8">
										<Typography variant="h6" color="textSecondary">
											No jobs found matching your criteria
										</Typography>
										<Typography variant="body2" color="textSecondary" className="mt-2">
											Try adjusting your search terms or filters
										</Typography>
									</div>
								) : (
									filteredJobs.map((job, idx) => (
										<JobDisplay key={job._id || idx} job={job} style={{ width: "18rem" }} />
									))
								)}
							</div>

							{/* Pagination */}
							{totalPages > 1 && (
								<Box display="flex" justifyContent="center" mt={6}>
									<Pagination
										count={totalPages}
										page={currentPage}
										onChange={handlePageChange}
										color="primary"
										size="large"
										sx={{
											'& .MuiPaginationItem-root': {
												borderRadius: '8px',
											}
										}}
									/>
								</Box>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Jobs;
// 		setShowFilters(!showFilters); // Toggle filter section visibility
// 	};

// 	return (
// 		<div className="max-w-7xl mx-auto my-2">
// 			{/* Add Filters Button */}
// 			<div className="flex justify-between items-center">
// 				<h2 className="text-lg font-bold">All Jobs</h2>
// 				<button
// 					className="text-sm text-blue-500 flex items-center gap-1"
// 					onClick={toggleFilters}
// 				>
// 					Add Filters <span>{showFilters ? "▲" : "▼"}</span> {/* Toggle arrow */}
// 				</button>
// 			</div>

// 			{/* Filter Section */}
// 			{showFilters && (
// 				<div className="my-4">
// 					<JobFilter className="sm:max-w-sm md:max-w-xl" />
// 				</div>
// 			)}

// 			{/* Jobs Section */}
// 			<div className="grid sm:grid-cols-1 md:grid-cols-3 gap-2">
// 				{filteredJobs.length === 0 ? (
// 					<span>No jobs Found</span>
// 				) : (
// 					filteredJobs.map((job, idx) => (
// 						<JobDisplay key={idx} job={job} style={{ width: "18rem" }} />
// 					))
// 				)}
// 			</div>
// 		</div>
// 	);
// }

// export default Jobs;
