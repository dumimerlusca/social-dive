import { useCallback } from "react";
import { useQuery } from "react-query";
import { get } from "services/api";

function useFetchData<T>(queryKey: string, url: string) {
	const fetcher = useCallback(async () => {
		const res = await get(url);
		return res.data;
	}, [url]);
	return useQuery<T>(queryKey, fetcher);
}

export default useFetchData;
