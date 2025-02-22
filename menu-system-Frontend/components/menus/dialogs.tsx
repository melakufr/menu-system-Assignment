import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useMenuStore } from "@/lib/store";

export const AddDialog = () => {
    const {
        menuData,
        isAddingItem,
        newItemName,
        setIsAddingItem,
        setNewItemName,
        addNewItem,
      } = useMenuStore()

  return (
    <>
      <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Menu Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Parent Item</Label>
              <div className="rounded-md bg-gray-50 p-2 text-sm">
                {menuData?.name}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Menu Name</Label>
              <Input
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Enter menu name"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddingItem(false)}>
              Cancel
            </Button>
            <Button onClick={async()=> await addNewItem()}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const EditDialog = () => {
    const {        
        newItemName,
        setIsEditing,isEdit,
        setNewItemName,
        updateItem,
      } = useMenuStore()
  return (
    <>
      <Dialog
        open={isEdit}
        onOpenChange={setIsEditing}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Menu Name</Label>
              <Input
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Enter menu name"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={async()=> await updateItem()}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const DeleteDialog = () => {
    const {
        itemToDelete,
        setItemToDelete,
        deleteItem,
      } = useMenuStore()
  return (
    <>
      <AlertDialog
        open={!!itemToDelete}
        onOpenChange={() => setItemToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Menu Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {itemToDelete?.name}? This action
              cannot be undone.
              {itemToDelete?.children?.length ? (
                <span className="mt-2 block text-red-600">
                  Warning: This will also delete all child items.
                </span>
              ) : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteItem}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
