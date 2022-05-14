import { RefObject } from 'react';
import useIntersectionObserver, { IntersectionObserverParams } from './useIntersectionObserver';

const useIsIntersecting = (elementRef: RefObject<Element>, intersectionObserverParams: IntersectionObserverParams) => {
  const entry = useIntersectionObserver(elementRef, intersectionObserverParams);
  return entry?.isIntersecting ?? false;
};

export default useIsIntersecting;
