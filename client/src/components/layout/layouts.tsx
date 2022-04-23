import React from "react";
import Header from "./Header";

export const AuthenticatedLayout: React.FC = ({ children }) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};
