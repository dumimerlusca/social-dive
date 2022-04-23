export const formatDate = (date: Date) => {
	const newDate = date.getTime();
	const dif = Date.now() - newDate;
	const seconds = dif / 1000;
	const minutes = seconds / 60;
	const hours = minutes / 60;
	const days = hours / 24;
	if (minutes < 1) return "now";
	if (minutes < 59) return `${Math.floor(minutes)}m`;
	if (hours < 24) return `${Math.floor(hours)}h`;

	return `${Math.floor(days)}days ago`;
};

export const truncateString = (string: string, maxLength: number) => {
	return `${string.slice(0, maxLength)}...`;
};
