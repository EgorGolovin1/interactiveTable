import { useDispatch } from "react-redux";
import { Button } from "../../shared/button/Button";
import css from "./AddMenu.module.scss";
import { useState } from "react";
import { addItem } from "../../store/slice";
import { v4 as uuidv4 } from "uuid";

export const AddMenu = ({ onClose }: Props) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id: uuidv4(),
    name: "",
    address: "",
  });

  const saveChanges = () => {
    if (formData.name || formData.address) {
      dispatch(addItem(formData));
      onClose();
    } else onClose();
  };
  return (
    <div className={css.wrapper}>
      <div className={css.title}>Создание элемента</div>
      <div className={css.content}>
        <label htmlFor="redactName">Название</label>
        <input
          type="text"
          id="redactName"
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />
        <label htmlFor="redactAddress">Адресс</label>
        <input
          type="text"
          id="redactAddress"
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
