import React from "react";

const NotificationListItem = () => {
	return (
		<li className='flex gap-3 items-center'>
			<img
				className='rounded-full h-8 w-8'
				src='https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
				alt=''
			/>
			<div>
				<p className='text-thin'>
					<span className='font-bold mr-2'>Paula comanac</span>liked your photo
				</p>
				<p className='text-sm'>5 min ago</p>
			</div>
		</li>
	);
};

export default NotificationListItem;
