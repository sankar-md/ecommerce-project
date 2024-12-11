import { ChartNoAxesCombined } from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();
  return (
    <Fragment>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChartNoAxesCombined />
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
