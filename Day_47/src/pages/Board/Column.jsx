import { useSortable } from "@dnd-kit/sortable";
import { defaultDropAnimationSideEffects } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import "./Board.scss";

import ListCard from "./ListCard";

function Column({ col }) {
  const { _id, columnName, column } = col;

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: _id });

  const dndKitStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? "0.4" : null,
  };

  return (
    <li ref={setNodeRef} style={dndKitStyle} {...attributes}>
      {/* _listeners_lắng nghe mỗi khi click card_task_header */}
      <div className="card_task">
        <div className="card_task_header" {...listeners}>
          <h2>{columnName}</h2>
          <button>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
        <ListCard col={column} />
        <div className="card_task_footer">
          <button>+ Add To Card</button>
        </div>
      </div>
    </li>
  );
}

export default Column;
