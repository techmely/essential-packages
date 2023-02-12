import * as React from "react";
import { useState } from "react";

export default function Button(props) {
  const [name, setName] = useState(() => "Foo");

  return (
    <div>
      {props.message || "Hello"}
      {name}! I can run in React, Vue, Solid or Svelte!
    </div>
  );
}
