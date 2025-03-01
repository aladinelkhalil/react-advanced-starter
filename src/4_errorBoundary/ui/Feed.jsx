import { FeedItem } from "./FeedItem";

// ...

const items = [
  {
    title: "first item",
    image: "https://via.placeholder.com/350x150",
  },
  {
    title: "second item",
    image: "https://via.placeholder.com/350x150",
  },
  {
    // by commenting out the title property, an error will occur in the FeedItem component that receives it.
    title: "third item",
    image: "https://via.placeholder.com/350x150",
  },
];

// ...

function FeedItemFallback() {
  return (
    <FeedItem
      title="Oops, an error occurred!"
      image="https://cdn.dribbble.com/users/1078347/screenshots/2799566/oops.png"
    />
  );
}

export default function Feed() {
  // TODO: Ensure that if a specific feed item fails, the others will still be shown. Use the FeedItemFallback above.
  return items.map((item, i) => <FeedItem key={i} {...item} />);
}
