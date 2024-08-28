import { useDispatch } from "react-redux";
import css from "./TableRow.module.scss";
import cn from "classnames";
import { checkItem, setEditableItem } from "../../store/slice";
import { CheckBox } from "../../shared/checkbox/Checkbox";
import { useEffect, useState } from "react";
import editIcon from "../../shared/static/images/editIcon.svg";
import { Button } from "../../shared/button/Button";

export const TableRow = ({
  id,
  name,
  address,
  checked,
  isStartProcessDeleting,
  setOpen,
}: Props) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeliting] = useState(false);

  const toggleItem = () => {
    dispatch(checkItem(id));
  };

  const setEditItem = () => {
    dispatch(setEditableItem({ id: id, name: name, address: address }));
  };

  useEffect(() => {
    if (isStartProcessDeleting && checked) setIsDeliting(true);
  }, [isStartProcessDeleting, checked]);

  return (
    <div
      className={cn(
        css.item,
        checked && css.itemChecked,
        isDeleting && css.itemDeletedAnimation
      )}
    >
      <div className={css.leftSide}>
        <CheckBox id={id} onChange={toggleItem} checked={checked} />
        <div className={css.name}>{name}</div>
      </div>

      <div className={css.address}>{address}</div>
      <div className={css.editButton} onClick={setOpen}>
        <Button imageSrc={editIcon} onClick={setEditItem} />
      </div>
    </div>
  );
};

type Props = {
  id: string;
  name: string;
  address: string;
  checked: boolean;
  isStartProcessDeleting: boolean;
  setOpen: () => void;
};
