import { useState } from "react";
import { useSelector } from "react-redux";

import { DndContext, DragOverlay } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import "~/pages/Board/Board.scss";
import Card from "./Card";

function ListCard({ col }) {
  const task = useSelector((state) => state.task.listTasks);
  const newTask = task.filter(({ column }) => column === col);
  const [items, setItems] = useState(newTask);
  const [activeId, setActiveId] = useState(null);

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = (event) => {
    // active_vị trí cũ, over_vị trí mới
    const { active, over } = event;

    if (!over || active.id === over.id) return null;

    setItems((items) => {
      const oldIndex = active.data.current.sortable.index;
      const newIndex = over.data.current.sortable.index;

      return arrayMove(items, oldIndex, newIndex);
    });

    setActiveId(null);
  };

  const handleDargOver = (event) => {
    const { active, over } = event;
    console.log(active);
    console.log(over);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDargOver}
      onDragEnd={handleDragEnd}
    >
      <ul className="card_task_wrapper">
        <SortableContext
          items={items?.map((i) => i._id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => {
            return <Card key={item._id} content={item} />;
          })}
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <Card content={items.find((i) => i._id === activeId)} />
          ) : null}
        </DragOverlay>
      </ul>
    </DndContext>
  );
}

export default ListCard;
