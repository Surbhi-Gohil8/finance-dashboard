"use client";

import { useTheme } from "next-themes";
import { useFinanceStore, Role } from "@/store/useFinanceStore";
import { Button } from "@/components/ui/button";
import { Moon, Sun, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMounted } from "@/hooks/useMounted";

export function HeaderControls() {
  const { theme, setTheme } = useTheme();
  const { role, setRole } = useFinanceStore();
  const isMounted = useMounted();

  if (!isMounted) return <div className="w-24 h-9" />;

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <UserCircle className="w-4 h-4" />
            <span className="capitalize">{role}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setRole("viewer")}>
            Viewer
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setRole("admin")}>
            Admin
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
