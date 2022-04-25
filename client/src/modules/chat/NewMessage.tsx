import InputWithIcon from "components/Input/InputWithIcon";
import { FiSend } from "react-icons/fi";
import useActiveChatContext from "./context/activeChatContext";

const NewMessage = () => {
	const { onSubmit, inputValue, onChange } = useActiveChatContext();

	return (
		<form onSubmit={onSubmit}>
			<InputWithIcon
				inputProps={{
					placeholder: "Type something",
					onChange: onChange,
					value: inputValue,
				}}
				wrapperClassName='!bg-gray-100 text-black'
				endIcon={
					<button type='submit'>
						<FiSend />
					</button>
				}
			/>
		</form>
	);
};

export default NewMessage;
