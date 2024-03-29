# @techmely/vike-island

This repository serves as an illustrative example that explores the
[Islands Architecture](https://jasonformat.com/islands-architecture/) on [Vike](https://vike.dev).

> The general idea of an “Islands” architecture is deceptively simple: render HTML pages on the server, and inject
> placeholders or slots around highly dynamic regions. These placeholders/slots contain the server-rendered HTML output
> from their corresponding widget. They denote regions that can then be "hydrated" on the client into small
> self-contained widgets, reusing their server-rendered initial HTML.
>
> — Jason Miller, Creator of Preact

## Features

- **Framework-Agnostic Flexibility**: This example strives to offer flexibility by accommodating multiple UI frameworks, especially Vue and React. While recognizing that most developers tend to stick to a single UI framework, it provides support for multiple ones.
- **Partial Hydration**: The primary focus lies in selectively and strategically hydrating components within a server-rendered HTML context. This approach optimizes performance by avoiding unnecessary rehydration of the entire application state.
- **Client Directives**: The project supports strategies related to immediate hydration using **client:load**, viewport visibility via **client:visible**, idle status with **client:idle**, and media query matches using **client:media**. These directives allow for conditional hydration of components.
- **Framework Agnostic Page Context**: It offers the ability to access the same Vike page context within any framework, currently Vue or React components.

## Usage

The core functionality involves marking components using a specific Higher Order Component (HOC) and the usage of directives. For instance:

### React

```tsx
import HeavyComponent from "~/components/HeavyComponent.island.tsx"; // React Component
import { withHydration } from "@techmely/vike-island/react";

const Heavy = withHydration(HeavyComponent);

export default function Page() {
  return (
    <>
      {/* Hydrate React component on viewport visibility */}
      <Heavy client:visible />
    </>
  );
}
```

### Vue

```vue
<script setup lang="ts">
import { withHydration } from "@techmely/vike-island/vue";
import HeavyComponent from "~/components/HeavyComponent.island.vue";

const Heavy = withHydration(HeavyComponent);
</script>

<template>
  <Heavy client:visible />
</template>
```

## Caveats

- Mandatory usage of the `.island.{tsx,jsx,vue}` suffix on island components.
- The component name (displayName) and the file name must be the same.
- Inability to render islands inside islands without unwrapping (`unwrap(island)`).
- Lack of support for client-side routing // Need todo more here

## Current Status

POC. When we need this, we will do this!

## Technical Details

The technical implementation of the islands architecture involves basically several 3 key steps:

1. **Server-Side HTML Rendering**: The pages undergo complete server-side rendering in the +onRenderHtml phase. During this stage, targeted elements designated as islands are specifically marked within the DOM using Higher Order Components (HOC).
2. **Server-Side Island Rendering**: After the completion of HTML rendering with marked islands, these identified components are then rendered using the guest framework renderer. The components reside within factories, generated via a Vite glob import. Rendering includes the provision of necessary data for hydration, encompassing defined strategies for each component.
3. **Strategic Client-Side Hydration**: Upon rendering, on the client side within `+client`, it looks for marked islands. For each identified island, the hydration data is parsed, and the respective hydration process is executed based on its strategy.

## Contributions

Contributions, suggestions, and feedback are welcomed and encouraged. Feel free to explore the source code and propose enhancements or report issues through the repository.

## See also

- [Jason Miller's Blog > Islands Architecture](https://jasonformat.com/islands-architecture/)
- [Astro > Concepts > Islands](https://docs.astro.build/en/concepts/islands/)
