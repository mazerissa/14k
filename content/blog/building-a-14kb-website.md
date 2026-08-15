---
title: Building a 14 KB Website
date: 2026-08-15
tags: web, performance, javascript
---

# Why 14 KB?

The website engine should be small, deterministic and fast.

The engine generates only the page that the browser needs.

# Procedural graphics

A deterministic seed lets the engine generate graphics without storing every SVG.

# Compression

Repeated words can be stored once inside a dictionary and referenced by small indexes.