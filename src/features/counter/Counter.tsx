import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./counterSlice";
import type { RootState } from "@/app/store";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <>
      <section>
        <span>{count}</span>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </section>
    </>
  );
};

export default Counter;
