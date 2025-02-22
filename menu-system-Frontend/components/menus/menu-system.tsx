"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Grid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/menus/menu-combobox";
// import { generateSlug } from "@/lib/menu-utils";
import { useMenuStore } from "@/lib/store";
import { AddDialog, DeleteDialog, EditDialog } from "./dialogs";
import MenuTreeItem from "./MenuTreeItem";

interface MenuItem {
  id: string;
  name: string;
  children?: MenuItem[];
  isExpanded?: boolean;
}

export function MenuSystem() {
  const router = useRouter();
  const {
    menuData,
    selectedItem,
    isLoading,
    error,
    initializeMenu,
    expandAll,
    collapseAll,
    selectComboboxItem,
  } = useMenuStore();

  useEffect(() => {
    initializeMenu();
  }, [initializeMenu]);

  const handleNavigate = (item: MenuItem) => {
    // const slug = generateSlug(item.name);
    // router.push(`/${slug}`);
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  if (!menuData) {
    return <div className="p-6">No menu data available</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-[#3B42F3] text-white">
          <Grid className="h-5 w-5" />
        </div>
        <h1 className="text-2xl font-semibold">Menus</h1>
      </div>

      <div className="mb-4">
        <Combobox
          data={menuData}
          onSelect={selectComboboxItem}
          selectedItem={selectedItem}
        />
      </div>

      <div className="mb-6 flex gap-2">
        <Button
          variant="secondary"
          className="bg-[#14161F] text-white hover:bg-[#14161F]/90"
          onClick={expandAll}
        >
          Expand All
        </Button>
        <Button variant="outline" onClick={collapseAll}>
          Collapse All
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr,300px]">
        <div className="space-y-2">
          <MenuTreeItem item={menuData} onNavigate={handleNavigate} />
        </div>
      </div>

      {/* Dialog */}
      <AddDialog />
      <EditDialog />
      <DeleteDialog />
    </div>
  );
}
