import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../shared/button/Button";
import css from "./EditMenu.module.scss";
import { editableItemSelector } from "../../store/selectors";
import { useState } from "react";
import { editItem } from "../../store/slice";

export const EditMenu = ({ onClose }: Props) => {
  const dispatch = useDispatch();
  const item = useSelector(editableItemSelector);

  const [formData, setFormData] = useState({ ...item });

  const saveChanges = () => {
    dispatch(editItem(formData));
    onClose();
  };
  return (
    <div className={css.wrapper}>
      <div className={css.title}>Редактирование данных</div>
      <div className={css.content}>
        <label htmlFor="redactName">Изменить название</label>
        <input
          type="text"
          id="redactName"
          defaultValue={item.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />
        <label htmlFor="redactAddress">Изменить адресс</label>
        <input
          type="text"
          id="redactAddress"
          defaultValue={item.address}
          onChange={(e) =>
            setFormData({
              ...formData,
              address: e.target.value,
            })
          }
        />
        <Button title="Cохранить изменения" onClick={saveChanges} />
      </div>
    </div>
  );
};

type Props = {
  onClose: () => void;
};
