"use client";

import { useTheme } from "next-themes";

import { CiCloudMoon, CiCloudSun } from "react-icons/ci";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? (
        <CiCloudSun className="size-8 hover:text-muted-foreground" />
      ) : (
        <CiCloudMoon className="size-8 hover:text-muted-foreground" />
      )}
    </button>
  );
}
