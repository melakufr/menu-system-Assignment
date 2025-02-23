import { create } from "zustand";
import { getMenuData, updateMenuData } from "@/lib/menu-utils";

interface MenuItem {
  id: string;
  name: string;
  children?: MenuItem[];
  isExpanded?: boolean;
}

interface MenuState {
  menuData: MenuItem | null;
  selectedItemId: string | null;
  selectedParentId: string | null;
  isAddingItem: boolean;
  isEdit: boolean;
  isEditingItem: MenuItem | null;
  itemToDelete: MenuItem | null;
  newItemName: string;
  selectedItem: string | null;
  isLoading: boolean;
  error: string | null;
  isExpanded:boolean;

  // Actions
  initializeMenu: () => Promise<void>;
  toggleExpansion: (id: string) => void;
  setIsExpanded:(isExpanded:boolean)=>void;
  expandAll: () => void;
  collapseAll: () => void;
  setSelectedItem: (id: string | null) => void;
  setSelectedParentId: (id: string | null) => void;
  setIsAddingItem: (isAdding: boolean) => void;
  setIsEditing: (isEditing: boolean) => void;
  setIsEditingItem: (item: MenuItem | null) => void;
  setItemToDelete: (item: MenuItem | null) => void;
  setNewItemName: (name: string) => void;
  addNewItem: () => Promise<void>;
  updateItem: () => Promise<void>;
  deleteItem: () => Promise<void>;
  selectComboboxItem: (itemId: string) => void;
}

function toggleExpansionHelper(
  item: MenuItem,
  itemId: string | null,
  expand: boolean | null = null
): MenuItem {
  const newItem = { ...item };

  if (itemId === null || item.id === itemId) {
    if (item.children?.length) {
      newItem.isExpanded = expand !== null ? expand : !item.isExpanded;
    }
  }

  if (item.children) {
    newItem.children = item.children.map((child) =>
      toggleExpansionHelper(child, itemId, itemId === null ? expand : null)
    );
  }

  return newItem;
}

export const findItemById = (menuData: any, id: string): any => {
  if (menuData.id === id) return menuData
  if (menuData.children) {
    for (const child of menuData.children) {
      const found = findItemById(child, id)
      if (found) return found
    }
  }
  return null
}
export function findParentItem(items: MenuItem|null, targetId: string): MenuItem | null {
  if (items?.children) {
    for (const child of items.children) {
      if (child.id === targetId) return items
      const found = findParentItem(child, targetId)
      if (found) return found
    }
  }
  return null
}


function addNewItemHelper(
  items: MenuItem,//menu data
  parentId: string,
  newItem: MenuItem
): MenuItem {
  const newItems = { ...items };
  if (items.id === parentId) {
    newItems.children = [...(items.children || []), newItem];
    return newItems;
  }

  if (items.children) {
    newItems.children = items.children.map((child) =>
      addNewItemHelper(child, parentId, newItem)
    );
  }

  return newItems;
}

function updateItemHelper(
  items: MenuItem,
  itemId: string,
  updatedName: string
): MenuItem {
  const newItems = { ...items };

  if (items.id === itemId) {
    newItems.name = updatedName;
    return newItems;
  }

  if (items.children) {
    newItems.children = items.children.map((child) =>
      updateItemHelper(child, itemId, updatedName)
    );
  }

  return newItems;
}

function deleteItemHelper(items: MenuItem, itemId: string): MenuItem {
  const newItems = { ...items };

  if (items.children) {
    newItems.children = items.children
      .filter((child) => child.id !== itemId)
      .map((child) => deleteItemHelper(child, itemId));
  }

  return newItems;
}

function findParentIds(
  items: MenuItem,
  targetId: string,
  path: string[] = []
): string[] | null {
  if (items.id === targetId) return path;
  if (items.children) {
    for (const child of items.children) {
      const result = findParentIds(child, targetId, [...path, items.id]);
      if (result) return result;
    }
  }
  return null;
}

export const useMenuStore = create<MenuState>((set, get) => ({
  menuData: null,
  selectedItemId: null,
  selectedParentId: null,
  isAddingItem: false,
  isEdit: false,
  isEditingItem: null,
  itemToDelete: null,
  newItemName: "",
  selectedItem: null,
  isLoading: false,
  error: null,
  isExpanded:true,

  initializeMenu: async () => {
    set({ isLoading: true, error: null });

    try {
      const data = await getMenuData();
      set({ menuData: data });
    } catch (error) {
      set({ error: "Failed to load menu data" });
    } finally {
      set({ isLoading: false });
    }
  },
  

  toggleExpansion: (id: string) => {
    const { menuData } = get();
    if (!menuData) return;

    const newData = toggleExpansionHelper(menuData, id);
    set({ menuData: newData });
    // updateMenuData(newData); //update param data
  },

  expandAll: () => {
    const { menuData } = get();
    if (!menuData) return;

    const newData = toggleExpansionHelper(menuData, null, true);
    set({ menuData: newData });
    // updateMenuData(newData); //update param data
  },

  collapseAll: () => {
    const { menuData } = get();
    if (!menuData) return;

    const newData = toggleExpansionHelper(menuData, null, false);
    set({ menuData: newData });
    // updateMenuData(newData);//update param data
  },

  setIsExpanded:(isExpande:boolean) => set({isExpanded:isExpande}),
  setSelectedItem: (id: string | null) => set({ selectedItem: id }),
  setSelectedParentId: (id: string | null) => set({ selectedParentId: id }),
  setIsAddingItem: (isAdding: boolean) => set({ isAddingItem: isAdding }),
  setIsEditing: (isEditing: boolean) => set({ isEdit: isEditing }),
  setIsEditingItem: (item: MenuItem | null) => set({ isEditingItem: item }),
  setItemToDelete: (item: MenuItem | null) => set({ itemToDelete: item }),
  setNewItemName: (name: string) => set({ newItemName: name }),

  addNewItem: async () => {

    const { menuData, selectedParentId, newItemName } = get();
    if (!menuData || !selectedParentId || !newItemName.trim()) return;
    const newItem: MenuItem = {
      id: `new`,
      name: newItemName,
      children: [],
      isExpanded: true,
    };

    const newDataTree = addNewItemHelper(menuData, selectedParentId, newItem);
    const result  = await updateMenuData(newDataTree, newItem, selectedParentId);
    console.log(`result=> `, result);

    set({
      menuData: newDataTree,
      isAddingItem: false,
      newItemName: "",
      selectedParentId: null,
    });
    
  },

  updateItem: async () => {
    const { menuData, isEditingItem, newItemName } = get();
    if (!menuData || !isEditingItem || !newItemName.trim()) return;

    const newData = updateItemHelper(menuData, isEditingItem.id, newItemName);
    set({
      menuData: newData,
      isEditingItem: null,
      isEdit: false,
      newItemName: "",
    });
    // await updateMenuData(newData); //update param data
  },

  deleteItem: async () => {
    const { menuData, itemToDelete } = get();
    if (!menuData || !itemToDelete) return;

    const newData = deleteItemHelper(menuData, itemToDelete.id);
    set({ menuData: newData, itemToDelete: null });
    // await updateMenuData(newData);//update param data
  },

  selectComboboxItem: (itemId: string) => {
    const { menuData } = get();
    if (!menuData) return;

    set({ selectedItem: itemId, selectedItemId: itemId });

    const parentIds = findParentIds(menuData, itemId, []);
    if (parentIds) {
      let newData = menuData;
      parentIds.forEach((id) => {
        newData = toggleExpansionHelper(newData, id, true);
      });
      set({ menuData: newData });
      // updateMenuData(newData); //update param data
    }
  },
}));
