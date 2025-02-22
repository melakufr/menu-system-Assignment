import type { MenuItem } from "@/types/menu";
import axios from "axios";

export async function getMenuData(): Promise<MenuItem> {
  const { data, status } = await axios.get(`/api/menu`);
  return data.data;
}

export async function updateMenuData(
  newDataTree: MenuItem,
  newItem: MenuItem,
  selectedParentId: string
): Promise<MenuItem> {
  const formData = {
    // newDataTree,
    newItem,
    selectedParentId,
  };

  const { data, status } = await axios.post(`/api/menu`,  formData );

  return data.data;
}

// export function generateSlug(name: string): string {
//   return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
// }

// export function buildMenuItemSlugs(
//   items: MenuItem[],
//   parentSlug: string[] = []
// ): MenuItem[] {
//   return items.map((item) => {
//     const slug = [...parentSlug, generateSlug(item.name)];
//     return {
//       ...item,
//       slug: slug.join("/"),
//       children: item.children
//         ? buildMenuItemSlugs(item.children, slug)
//         : undefined,
//     };
//   });
// }

// export async function findMenuItemBySlug(
//   slug: string[]
// ): Promise<MenuItem | null> {
//   const menuData = await getMenuData();
//   const slugPath = slug.join("/");

//   function findItem(items: MenuItem[]): MenuItem | null {
//     for (const item of items) {
//       if (item.slug === slugPath) return item;
//       if (item.children) {
//         const found = findItem(item.children);
//         if (found) return found;
//       }
//     }
//     return null;
//   }

//   const menuWithSlugs = buildMenuItemSlugs([menuData]);
//   return findItem(menuWithSlugs);
// }
