import s from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={s.loader}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
