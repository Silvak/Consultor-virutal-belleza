// Routes that require an user session
export const authRoutes = [];

// Routes that require an admin session
export const adminRoutes = [];

// All protected routes
export const protectedRoutes = [...authRoutes, ...adminRoutes];
