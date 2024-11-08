import ListPage from "@/components/pages/ListPage";

const fakeData = [
  {
    id: "1",
    label: "****..1234",
    title: "John Doe",
    loc: 200,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "2",
    label: "****..5678",
    title: "Jane Smith",
    loc: 200,
    description:
      "Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio.",
  },
];

export default function TabTwoScreen() {
  return <ListPage initialData={fakeData} />;
}
