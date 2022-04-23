import InputWithIcon from "components/Input/InputWithIcon";
import React, { FormEvent, useState } from "react";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import { getCurrentChat } from "store/selectors/appSelectors";
import { useSendMessage } from "./apiClient";

const NewMessage = () => {
	const currentChat = useSelector(getCurrentChat);
	const [value, setValue] = useState("");

	const { mutate: sendMessage } = useSendMessage(currentChat?._id!);

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		setValue("");
		sendMessage(value);
	};

	return (
		<form onSubmit={onSubmit}>
			<InputWithIcon
				inputProps={{
					placeholder: "Type something",
					onChange: e => setValue(e.target.value),
					value: value,
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
