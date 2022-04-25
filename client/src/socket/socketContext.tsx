import { queryKeys } from "common/constansts";
import { createContext, useContext, useEffect } from "react";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { SERVER_URL } from "services/api";
import { io } from "socket.io-client";
import { getCurrentUser } from "store/selectors/appSelectors";

const SocketContext = createContext<any>({} as any);

const socket = io(SERVER_URL, { autoConnect: false });

const SocketContextProvider: React.FC = ({ children }) => {
	const currentUser = useSelector(getCurrentUser);
	const queryClient = useQueryClient();

	useEffect(() => {
		if (!currentUser) return;

		socket.auth = { ...currentUser };
		socket.connect();
	}, [currentUser]);

	useEffect(() => {
		const onConnect = () => {
			console.log("Connected");

			// Emit message to all connected friends
		};
		socket.on("connect", onConnect);
		return () => {
			socket.removeListener("connect", onConnect);
		};
	}, []);

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	);
};

const useSocketContext = () => useContext(SocketContext);

export { SocketContextProvider };
export default useSocketContext;
