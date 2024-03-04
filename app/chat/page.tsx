import { ShoutForm } from "./ShoutForm";
import ShoutFeed from "./ShoutFeed";
export default async function ShoutBox() {
  return (
    <div className="mx-auto p-16">
      <h3>
        Chat 2.0
        <ShoutForm type={1} id={1} />
      </h3>
      <div>
        <ShoutFeed type={1} />
      </div>
    </div>
  );
}