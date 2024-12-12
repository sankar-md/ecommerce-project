import { AlignJustify, LogOut } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

function AdminHeader({ setOpen }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button className="lg:hidden sm:block" onClick={() => setOpen(true)}>
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow">
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
