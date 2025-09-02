const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const USER_END_POINT=`${API_BASE_URL}/api/v1/user`;
export const JOB_END_POINT=`${API_BASE_URL}/api/v1/job`;
export const APPLICATION_END_POINT=`${API_BASE_URL}/api/v1/application`;
export const COMPANY_END_POINT=`${API_BASE_URL}/api/v1/company`;