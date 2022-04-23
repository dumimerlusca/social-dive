import React, { useEffect } from "react";

const useClickOutside = (ref: React.RefObject<HTMLElement>, onClick: any) => {
	useEffect(() => {
		const listener = (event: any) => {
			// Do nothing if clicking ref's element or descendent elements
			if (!ref.current || ref.current.contains(event.target)) {
				return;
			}
			onClick(event);
		};
		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);
		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [ref, onClick]);
};

export default useClickOutside;
