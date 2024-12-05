#!/bin/bash
cd frontend
npm install --legacy-peer-deps
npm install -g vite typescript
npm run build
