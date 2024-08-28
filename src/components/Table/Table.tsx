import { useDispatch, useSelector } from "react-redux";
import { TableRow } from "../TableRow/TableRow";
import { Button } from "../../shared/button/Button";
import { CheckBox } from "../../shared/checkbox/Checkbox";

import { checkAll, deleteItems } from "../../store/slice";
import { checkAllSelector, itemsSelector } from "../../store/selectors";

import { useEffect, useRef, useState } from "react";
import { useDataLoadController } from "../../shared/hooks/useDataLoadController";

import css from "./Table.module.scss";
import PopUpRight from "../../shared/Modal";
import { EditMenu } from "../EditMenu/EditMenu";
import { AddMenu } from "../AddMenu/AddMenu";

export const Table = () => {
  const dispatch = useDispatch();

  const isAllChecked = useSelector(checkAllSelector);
  const items = useSelector(itemsSelector);

  const [loadedChunks, setLoadedChunks] = useState<number>(1);
  const [isNeedInitScroll, setIsNeedInitScroll] = useState(true);
  const [isStartProcessDeleting, setStartProcessDeleting] = useState(false);
  const [isOpenEditMenu, setOpenEditMenu] = useState(false);
  const [isOpenAddMenu, setOpenAddMenu] = useState(false);

  const $table = useRef<HTMLDivElement | null>(null);

  useDataLoadController(
    loadedChunks,
    setLoadedChunks,
    $table,
    isNeedInitScroll
  );

  const toggleAll = () => {
    dispatch(checkAll("toggle"));
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);

      setIsNeedInitScroll(false);
    }, 300);
  }, []);

  const deleteFunc = () => {
    setStartProcessDeleting(true);

    setTimeout(() => {
      dispatch(deleteItems());
      setStartProcessDeleting(false);
    }, 600);
  };

  const addFunc = () => {
    setOpenAddMenu(true);
  };

  const openEditMenu = () => {
    setOpenEditMenu(true);
  };

  return (
    <>
      <div ref={$table} className={css.wrapper}>
        <div className={css.wrapper__header}>
          <p className={css.wrapper__header_name}>Компания</p>
          <div className={css.wrapper__header_left}>
            <p className={css.wrapper__header_name}>Адресс</p>
          </div>
        </div>
        {!items.length && (
          <div className={css.wrapper__noInfo}>
            Нет данных о копмпаниях. Добавьте компанию.
          </div>
        )}
        {items?.map((element) => (
          <TableRow
            id={element.id}
            name={element.name}
            address={element.address}
            checked={element.checked}
            isStartProcessDeleting={isStartProcessDeleting}
            key={element.id}
            setOpen={openEditMenu}
          />
        ))}

        <div className={css.buttonsWrapper}>
          <CheckBox
            id={"allCheckbox"}
            checked={isAllChecked}
            onChange={toggleAll}
            description="Выбрать все"
          />
          <Button onClick={deleteFunc} title="Удалить" />
          <Button onClick={addFunc} title="Добавить" />
        </div>
      </div>
      <PopUpRight
        isOpen={isOpenAddMenu || isOpenEditMenu}
        onClose={
          isOpenAddMenu
            ? () => setOpenAddMenu(false)
            : () => setOpenEditMenu(false)
        }
      >
        {isOpenAddMenu ? (
          <AddMenu onClose={() => setOpenAddMenu(false)} />
        ) : (
          <EditMenu onClose={() => setOpenEditMenu(false)} />
        )}
      </PopUpRight>
    </>
  );
};
