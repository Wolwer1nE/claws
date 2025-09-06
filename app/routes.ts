import type { RouteConfig } from "@react-router/dev/routes";

export default [
	{
		index: true,
		file: "routes/home.tsx",
	},
	{
		path: "/courses/:courseId",
		file: "routes/course-detail.tsx",
	},
] satisfies RouteConfig;
