// "use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMenuStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { MenuItem } from "@/types/menu";

export default function MenuTreeItem({
  item,
  depth = 0,
  isLastChild = false,
}: {
  item: MenuItem;
  depth?: number;
  isLastChild?: boolean;
}) {

  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {
    toggleExpansion,
    setIsAddingItem,setIsEditing,
    setSelectedParentId,
    setIsEditingItem,
    setItemToDelete,
    selectedItemId,
    setNewItemName,
  } = useMenuStore();

  return (
    <div className="relative">
      {/* Tree lines */}
      {depth > 0 && (
        <>
          {/* Vertical line from parent */}
          <div
            className="absolute border-l-2 border border-gray-200"
            style={{
              left: `${depth * 24 - 12}px`,
              top: 0,
              height: isLastChild ? "16px" : "100%",
            }}
          />
          {/* Horizontal line to item */}
          <div
            className="absolute border-t-2 border border-gray-200"
            style={{
              left: `${depth * 24 - 12}px`,
              top: "16px",
              width: "12px",
            }}
          />
        </>
      )}

      <div
        className="group relative flex items-center gap-1 py-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => !isDropdownOpen && setIsHovered(false)}
      >
        <div
          style={{ marginLeft: `${depth * 24}px` }}
          className={cn(
            "flex flex-1 items-center gap-1",
            item.id === selectedItemId && "font-medium text-primary"
          )}
        >
          {item.children?.length ? (
            <Button
              size="icon"
              variant="ghost"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => toggleExpansion(item.id)}
            >
              {item.isExpanded ? (
                <ChevronDown className="h-4 w-4 shrink-0" />
              ) : (
                <ChevronRight className="h-4 w-4 shrink-0" />
              )}
            </Button>
          ) : (
            <div className="w-4" />
          )}
          <div className="flex items-center gap-1">
            <button
              className="text-left hover:text-primary"
              // onClick={() => onNavigate(item)}
            >
              {item.name}
            </button>
            {isHovered && (
              <>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setSelectedParentId(item.id);
                  setIsAddingItem(true);
                  setNewItemName("");
                }}
                className="h-5 w-5 rounded-full bg-[#3B42F3] p-0 text-white hover:bg-[#3B42F3]/90"
              >
                <Plus className="h-3 w-3" />
              </Button>

                  
              {/* edit
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setIsEditing(true);
                  setIsEditingItem(item);
                  setNewItemName(item.name);
                }}
                className="h-5 w-5 rounded-full p-0 text-green-700"
              >
                <Pencil className="h-3 w-3" />
              </Button> */}

                 {/* delete
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setItemToDelete(item)}
                className="h-5 w-5 rounded-full  p-0 text-red-600"
              >
                <Trash2 className="h-3 w-3" />
              </Button> */}
              </>              
            )}
          </div>
          
        </div>
      </div>
      
      {item.isExpanded &&
        item.children?.map((child, index) => (
          <MenuTreeItem
            key={child.id}
            item={child}
            depth={depth + 1}
            isLastChild={index === item.children!.length - 1}
          />
        ))}
    </div>
  );
}
