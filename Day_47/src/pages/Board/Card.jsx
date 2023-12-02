import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Card({ content }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: content._id });

  const dndKitStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? "0.4" : null,
  };

  return (
    <li
      ref={setNodeRef}
      style={dndKitStyle}
      {...attributes}
      {...listeners}
      className="item_task"
    >
      <p>{content.content}</p>
    </li>
  );
}

export default Card;
