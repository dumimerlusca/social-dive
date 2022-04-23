import classNames from "classnames";
import { DEFAULT_IMAGE } from "data/users";
import { useAddComment } from "modules/posts/apiClient";
import React, { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_API_URL } from "services/api";
import { getCurrentUserId } from "store/selectors/appSelectors";

type NewCommentProps = {
	wrapperClassname?: string;
	postId: string;
};

const NewComment: React.FC<NewCommentProps> = ({
	wrapperClassname,
	postId,
}) => {
	const [text, setText] = useState("");

	const { mutate: addComment } = useAddComment(postId, text);

	const currentUserId = useSelector(getCurrentUserId);

	const onChange = (e: any) => {
		setText(e.target.value);
	};

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		addComment();
		setText("");
	};

	return (
		<form onSubmit={onSubmit} className={classNames(wrapperClassname)}>
			<div className='flex gap-3 items-center'>
				<img
					className='rounded-full h-8 w-8 flex-shrink-0'
					src={BASE_API_URL + `/users/${currentUserId}/photo`}
					alt=''
				/>
				<input
					value={text}
					onChange={onChange}
					className='w-full py-2 px-4 rounded-md bg-[rgba(255,255,255,0.03)]'
					type='text'
					placeholder='Write a public comment'
				/>
			</div>
		</form>
	);
};

export default NewComment;
