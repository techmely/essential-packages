import { createSignal } from "solid-js";

function Button(props) {
  const [name, setName] = createSignal("Foo");

  return (
    <div>
      {props.message || "Hello"}
      {name()}! I can run in React, Vue, Solid or Svelte!
    </div>
  );
}

export default Button;
