import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

// Mock framer-motion to render plain elements for predictable tests
vi.mock("framer-motion", async () => {
  const React = await import("react");

  // Cache one stable component per tag. Returning a fresh component on every
  // property access would make React remount the subtree on each render,
  // which loses controlled-input state mid-typing in tests.
  const componentCache = new Map<string, React.ElementType>();

  const makeComponent = (tag: string) => {
    const Component = React.forwardRef(
      (
        { children, ...rest }: React.PropsWithChildren<Record<string, unknown>>,
        ref: React.Ref<HTMLElement>,
      ) => {
        // Strip framer-motion-only props so React doesn't warn
        const safeProps: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(rest)) {
          if (
            [
              "initial",
              "animate",
              "exit",
              "transition",
              "whileHover",
              "whileTap",
              "whileDrag",
              "whileInView",
              "viewport",
              "drag",
              "dragElastic",
              "dragSnapToOrigin",
              "dragTransition",
              "layout",
              "layoutId",
              "variants",
              "onDragStart",
              "onDrag",
              "onDragEnd",
            ].includes(key)
          ) {
            continue;
          }
          safeProps[key] = value;
        }
        return React.createElement(tag, { ...safeProps, ref }, children);
      },
    );
    Component.displayName = `motion.${tag}`;
    return Component;
  };

  const handler = {
    get: (_target: unknown, prop: string | symbol) => {
      // Preserve the underlying HTML tag (motion.button → 'button',
      // motion.div → 'div', etc.) so semantic role queries in tests work.
      const tag =
        typeof prop === "string" && /^[a-z]+$/i.test(prop) ? prop : "div";
      if (!componentCache.has(tag)) {
        componentCache.set(tag, makeComponent(tag));
      }
      return componentCache.get(tag);
    },
  };
  const motion = new Proxy({}, handler);
  return {
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: () => 0,
    useMotionValue: () => ({
      get: () => 0,
      set: () => undefined,
    }),
    useSpring: () => ({ get: () => 0, set: () => undefined }),
  };
});

// Mock canvas-confetti — never animate during tests
vi.mock("canvas-confetti", () => ({
  default: vi.fn(),
}));

// IntersectionObserver — JSDOM doesn't ship it
class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
  root = null;
  rootMargin = "";
  thresholds: ReadonlyArray<number> = [];
}
// @ts-expect-error attach to global
global.IntersectionObserver = IO;
// @ts-expect-error attach to window
window.IntersectionObserver = IO;

// matchMedia — JSDOM doesn't ship it
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});

// scrollTo
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
