import type { Key, ReactNode } from 'react';
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  getKey: (item: T) => Key;
}
export default function List<T>({ items, renderItem, getKey }: ListProps<T>) {
  return <ul>{items.map(item => <li key={getKey(item)}>{renderItem(item)}</li>)}</ul>;
}
