import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock de URL.createObjectURL y revokeObjectURL
if (typeof window !== "undefined") {
  window.URL.createObjectURL = vi.fn(() => "mock-url");
  window.URL.revokeObjectURL = vi.fn();
}

// Mock de atob para entornos que no lo tengan (jsdom lo tiene, pero por seguridad)
if (typeof window !== "undefined" && !window.atob) {
  window.atob = vi.fn((str: string) => Buffer.from(str, "base64").toString("binary"));
}
