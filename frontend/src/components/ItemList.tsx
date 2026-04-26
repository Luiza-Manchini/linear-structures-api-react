interface ItemListProps {
  items: string[];
}

export default function ItemList({ items }: ItemListProps) {
  if (items.length === 0) {
    return <p className="empty-state">Nenhum item na estrutura.</p>;
  }

  return (
    <ol className="item-list">
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>
          [{index}] {item}
        </li>
      ))}
    </ol>
  );
}
