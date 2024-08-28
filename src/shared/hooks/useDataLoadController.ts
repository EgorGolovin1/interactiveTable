import { useDispatch } from "react-redux";
import { useGetChunksQuery } from "../../feature/api/services/content";
import { MutableRefObject, useEffect, useState } from "react";
import { checkAll, uploadData } from "../../store/slice";

export const useDataLoadController = (
  loadedChunks: number,
  setLoadedChunks: (arg: number) => void,
  $table: MutableRefObject<HTMLDivElement | null>,
  isNeedInitScroll: boolean
) => {
  const [isNeedMoreData, setIsNeedMoreData] = useState(false);

  const dispatch = useDispatch();

  const { status, currentData } = useGetChunksQuery(loadedChunks.toString());

  const handleScroll = () => {
    const el = $table?.current;
    if (!el) return;
    if (
      window.innerHeight + document.documentElement.scrollTop + 50 >
        el.getBoundingClientRect().height &&
      !isNeedInitScroll
    ) {
      setIsNeedMoreData(true);
      setLoadedChunks(loadedChunks + 1);
    } else setIsNeedMoreData(false);
  };

  useEffect(() => {
    if (loadedChunks === 1 && status === "fulfilled" && isNeedInitScroll) {
      dispatch(uploadData(currentData));
    }

    if (isNeedMoreData && currentData) {
      dispatch(uploadData(currentData));
      dispatch(checkAll("unset"));
    }

    currentData && window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isNeedMoreData, currentData, isNeedInitScroll]);
};
