"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface MenuItem {
  id: string
  name: string
  children?: MenuItem[]
}

interface ComboboxProps {
  data: MenuItem
  onSelect: (value: string) => void
  selectedItem: string | null
}

function flattenMenuItems(item: MenuItem, depth = 0): { id: string; name: string; depth: number }[] {
  const items = [{ id: item.id, name: item.name, depth }]
  if (item.children) {
    item.children.forEach((child) => {
      items.push(...flattenMenuItems(child, depth + 1))
    })
  }
  return items
}

export function Combobox({ data, onSelect, selectedItem }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const items = flattenMenuItems(data)
  const selectedItemName = items.find((item) => item.id === selectedItem)?.name

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between md:w-[300px]">
          {selectedItemName ?? "Select menu item..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 md:w-[300px]">
        <Command>
          <CommandInput placeholder="Search menu..." />
          <CommandList>
            <CommandEmpty>No menu item found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-auto">
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => {
                    onSelect(item.id)
                    setOpen(false)
                  }}
                  className={cn(selectedItem === item.id && "bg-primary text-primary-foreground")}
                >
                  <Check className={cn("mr-2 h-4 w-4", selectedItem === item.id ? "opacity-100" : "opacity-0")} />
                  <span style={{ marginLeft: `${item.depth * 12}px` }}>{item.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

