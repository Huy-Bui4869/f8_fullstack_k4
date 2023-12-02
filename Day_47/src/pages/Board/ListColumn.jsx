import { useState } from "react";
import { useSelector } from "react-redux";
import {
  DndContext,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import "./Board.scss";

import Column from "./Column";

function ListColumn() {
  const columns = useSelector((state) => state.task.columns);
  const [items, setItems] = useState(columns);
  const [activeId, setActiveId] = useState(null);

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
  };

  //Sắp xếp lại sau khi thả.
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return null;

    setItems((items) => {
      const { index: oldIndex } = active.data.current.sortable;
      const { index: newIndex } = over.data.current.sortable;

      return arrayMove(items, oldIndex, newIndex);
    });

    setActiveId(null);
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <ul className="list-stask">
        <SortableContext
          items={items?.map((i) => i._id)}
          strategy={horizontalListSortingStrategy}
        >
          {items.map((col) => {
            return <Column key={col._id} col={col} />;
          })}

          <li className="add_column">
            <button className="btnAddtask">+ Add new column</button>
          </li>
        </SortableContext>
        <DragOverlay dropAnimation={customElements}>
          {activeId ? (
            <Column col={items.find((i) => i._id === activeId)} />
          ) : null}
        </DragOverlay>
      </ul>
    </DndContext>
  );
}

export default ListColumn;
