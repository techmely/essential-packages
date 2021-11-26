# Vite-plugin-runtime-env

## Problem

Cơ chế sẵn có của Vite không cho phép phân tách code và env theo chuẩn [12-Factors](https://12factor.net/)

## Solution

Plugin này giải quyết vấn đề trên bằng cách tách config env ra 1 module riêng khỏi code bundle, mở ra cánh cửa cho việc mount và update config runtime khi chạy trên môi trường container.

## Usage

Khai báo env như convention của Vite: <https://vitejs.dev/guide/env-and-mode.html> .env.production

```javascript
ENV=production
USER_API_URL=https://services.user.com
```

.vite.config.ts

```javascript
import ViteRuntimeEnv from '@techmely/vite-plugin-runtime-env';
import { UserConfig } from 'vite';

const config: UserConfig = {
  plugins: [ViteRuntimeEnv()],
};
```

client code:

```javascript
console.log(window._env_.ENV); // "production"
```
